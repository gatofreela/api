import { randomUUID } from "node:crypto";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import { z } from "zod";
import { PasswordRegisterService } from "./password-register.service";
import { PrismaService } from "./prisma.service";

@Injectable()
export class FakeFactoryService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly registerService: PasswordRegisterService,
  ) {}

  async generateUser(
    props?: Partial<
      Parameters<typeof PasswordRegisterService.prototype.execute>[0]
    >,
    config?: Parameters<typeof PasswordRegisterService.prototype.execute>[1],
  ) {
    return this.registerService.execute(
      {
        email: props?.email ?? `${randomUUID()}${faker.internet.email()}`,
        password: props?.password ?? faker.internet.password(),
      },
      config,
    );
  }
}
