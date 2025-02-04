import { Module } from "@nestjs/common";
import { APP_PIPE } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ZodValidationPipe } from "nestjs-zod";
import { AuthController } from "../controllers/auth.controller";
import { HashPasswordService } from "../services/hash-password.service";
import { PasswordLoginService } from "../services/password-login.service";
import { PasswordRegisterService } from "../services/password-register.service";
import { PrismaService } from "../services/prisma.service";
import { VerifyPasswordService } from "../services/verify-password.service";
import { JwtStrategy } from "../strategies/jwt.strategy";
import { env } from "../utils/config/env";

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { algorithm: "HS256" },
      verifyOptions: { algorithms: ["HS256"] },
    }),
  ],
  providers: [
    PrismaService,
    PasswordRegisterService,
    PasswordLoginService,
    HashPasswordService,
    VerifyPasswordService,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
