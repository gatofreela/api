import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "./prisma.service";

@Injectable()
export class CreateUserService {
  constructor(private readonly prismaService: PrismaService) {}

  static get inputSchema() {
    return z.object({
      name: z.string().optional(),
      email: z.string().email(),
      image: z.string().optional(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = CreateUserService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(input: z.infer<typeof CreateUserService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    const user = await this.prismaService.user.create({
      data: {
        ...validatedInput,
      },
    });

    return user;
  }
}
