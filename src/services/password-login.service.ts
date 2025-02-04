import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { z } from "zod";
import { JwtContent } from "../types/jwt-content";
import { PrismaService } from "./prisma.service";
import { VerifyPasswordService } from "./verify-password.service";

@Injectable()
export class PasswordLoginService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly verifyPasswordService: VerifyPasswordService,
  ) {}

  static get inputSchema() {
    return z.object({
      email: z.string().email(),
      password: z.string(),
    });
  }

  private validateInput(input: unknown) {
    const { data, error } = PasswordLoginService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(
    input: z.infer<typeof PasswordLoginService.inputSchema>,
    config?: Pick<Partial<JwtSignOptions>, "expiresIn" | "algorithm">,
  ) {
    const validatedInput = this.validateInput(input);

    const user = await this.prismaService.user.findUnique({
      where: { email: validatedInput.email },

      include: {
        logo: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!user.password || !user.salt) {
      throw new Error("User password not registered yet");
    }

    const isPasswordValid = await this.verifyPasswordService.execute({
      hashedPassword: user.password,
      salt: user.salt,
      password: validatedInput.password,
    });

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const jwtContent: JwtContent = {
      userId: user.id,
      email: user.email,
      imageUrl: user.logo?.id,
    };

    const jwt = this.jwtService.sign(jwtContent, config);

    return {
      jwt,
      user: { ...user, password: undefined, salt: undefined },
    };
  }
}
