import { Module } from "@nestjs/common";
import { HashPasswordService } from "../services/hash-password.service";
import { PrismaService } from "../services/prisma.service";
import { UpdatePasswordService } from "../services/update-password.service";
import { VerifyPasswordService } from "../services/verify-password.service";

@Module({
  providers: [
    PrismaService,
    UpdatePasswordService,
    HashPasswordService,
    VerifyPasswordService,
  ],
})
export class UserModule {}
