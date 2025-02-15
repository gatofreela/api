import { Injectable } from "@nestjs/common";
import { Resend } from "resend";
import { z } from "zod";
import { env } from "../utils/config/env";
import { PrismaService } from "./prisma.service";

@Injectable()
export class SendMailService {
  private readonly sendMail: Resend;

  constructor(private readonly prismaService: PrismaService) {
    this.sendMail = new Resend(env.RESEND_API_KEY);
  }

  static get inputSchema() {
    return z.object({
      from: z.string().email(),
      to: z.array(z.string()),
      subject: z.string(),
      content: z.string(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = SendMailService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(input: z.infer<typeof SendMailService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    // Implementation here...
    const { data, error } = await this.sendMail.emails.send({
      from: validatedInput.from,
      to: validatedInput.to,
      subject: validatedInput.subject,
      html: validatedInput.content,
    });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
