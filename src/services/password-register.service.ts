import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

import { rolesEnum } from "src/types/roles";


import { z } from "zod";
import { HashPasswordService } from "./hash-password.service";
import { PrismaService } from "./prisma.service";

@Injectable()
export class PasswordRegisterService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly hashPasswordService: HashPasswordService,
  ) {}

  static get inputSchema() {
    return z.object({
      email: z.string().email(),
      password: z.string(),

      role: z.enum(rolesEnum),


    });
  }

  private validateInput(input: unknown) {
    const { data, error } =
      PasswordRegisterService.inputSchema.safeParse(input);
    if (error)
      throw new Error(error.errors.flatMap((e) => e.message).join("\n"));
    return data;
  }

  async execute(
    input: z.infer<typeof PasswordRegisterService.inputSchema>,
    config?: Pick<
      Partial<JwtSignOptions>,
      "expiresIn" | "algorithm" | "secret"
    >,
  ) {
    const validatedInput = this.validateInput(input);

    let user = await this.prismaService.user.findUnique({
      where: { email: validatedInput.email },

      include: {
        logo: true,
      },
    });

    if (user?.password && user.salt) {
      throw new Error("User password is already registered");
    }

    const { salt, hash } = await this.hashPasswordService.execute({
      password: validatedInput.password,
    });

    if (!user) {
      user = await this.prismaService.user.create({
        data: {
          email: validatedInput.email,
          password: hash,
          salt,

          role: validatedInput.role,


        },

        include: {
          logo: true,
        },
      });
    } else {
      user = await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          password: hash,
          salt,
        },

        include: {
          logo: true,
        },
      });
    }

    const jwtContent = {
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
