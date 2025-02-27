import { Injectable } from "@nestjs/common";
import { roles, rolesEnum } from "src/types/roles";
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
      role: z.enum(rolesEnum),
    });
  }

  private validateInput(input: unknown) {
    const parsed = CreateUserService.inputSchema.safeParse(input);

    if (!parsed.success) {
      throw new Error(parsed.error.errors[0].message);
    }

    const data = parsed.data;

    if (!roles.includes(data.role)) {
      throw new Error(`Invalid role: ${data.role}`);
    }

    return data;
  }

  async execute(input: z.infer<typeof CreateUserService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    const user = await this.prismaService.user.create({
      data: {
        ...validatedInput,
        role: validatedInput.role.toUpperCase(),
      },
    });

    return user;
  }
}
