import { Injectable, UnauthorizedException } from "@nestjs/common";

import { z } from "zod";
import { HashPasswordService } from "./hash-password.service";
import { PrismaService } from "./prisma.service";
import { VerifyPasswordService } from "./verify-password.service";



@Injectable()
export class UpdatePasswordService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly verifyPasswordService: VerifyPasswordService,

    private readonly hashPasswordService: HashPasswordService,



  ) {}

  static get inputSchema() {
    return z.object({
      userId: z.string(),
      Password: z.string(),
      newPassword: z.string(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = UpdatePasswordService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(input: z.infer<typeof UpdatePasswordService.inputSchema>) {
    const validatedInput = this.validateInput(input);

    const { userId, Password, newPassword } = validatedInput;

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (!user.password || !user.salt) {
      throw new Error("User password or salt is missing");
    }

    const isPasswordValid = await this.verifyPasswordService.execute({
      password: Password,
      salt: user.salt,
      hashedPassword: user.password,
    });

    if (!isPasswordValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    const { salt, hash } = await this.hashPasswordService.execute({
      password: newPassword,
    });

    await this.prismaService.user.update({
      where: { id: userId },
      data: { password: hash, salt },
    });

    return { message: "Password changed successfully" };
  }
}
