import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Resend } from "resend";
import { z } from "zod";

@Injectable()
export class SendMailService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendMail: Resend = new Resend('a')
  ) {}

  static get inputSchema() {
    return z.object({
      // data validation here...
      from: z.string().email(),
      to: z.string(),
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
    const {data, error} = await this.sendMail.emails.send({
      from: validatedInput.from,
      to: [validatedInput.to],
      subject: validatedInput.subject,
      html: validatedInput.content

    })

    if(error) {
      throw new Error(error.message)
    }
    return data;

  }
}
