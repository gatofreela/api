import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PasswordRegisterService } from "./password-register.service";
import { faker } from "@faker-js/faker";
import { randomUUID } from "node:crypto";
import { z } from "zod";

@Injectable()
export class FakeFactoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly registerService: PasswordRegisterService,
  ) {}

  async generateUser(
    props?: Partial<z.infer<typeof PasswordRegisterService.inputSchema>>,
  ) {
    return this.registerService.execute({
      email: props?.email ?? `${randomUUID()}${faker.internet.email()}`,
      password: props?.password ?? faker.internet.password(),
    });
  }
}
