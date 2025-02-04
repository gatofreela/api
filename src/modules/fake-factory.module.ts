import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { FakeFactoryService } from "../../src/services/fake-factory.service";
import { HashPasswordService } from "../../src/services/hash-password.service";
import { PasswordRegisterService } from "../../src/services/password-register.service";
import { PrismaService } from "../../src/services/prisma.service";
import { VerifyPasswordService } from "../../src/services/verify-password.service";
import { env } from "../../src/utils/config/env";

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      secretOrPrivateKey: env.JWT_SECRET,
    }),
  ],
  providers: [
    PrismaService,
    FakeFactoryService,
    PasswordRegisterService,
    HashPasswordService,
  ],
  exports: [FakeFactoryService],
})
export class FakeFactoryModule {}
