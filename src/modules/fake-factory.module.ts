import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { FakeFactoryService } from "../services/fake-factory.service";
import { HashPasswordService } from "../services/hash-password.service";
import { PasswordRegisterService } from "../services/password-register.service";
import { PrismaService } from "../services/prisma.service";
import { VerifyPasswordService } from "../services/verify-password.service";
import { env } from "../utils/config/env";

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
