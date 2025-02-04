import { createZodDto } from "nestjs-zod";
import { PasswordRegisterService } from "../services/password-register.service";

export class PasswordRegisterDto extends createZodDto(
  PasswordRegisterService.inputSchema,
) {}
