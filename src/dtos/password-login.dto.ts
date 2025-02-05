import { createZodDto } from "nestjs-zod";
import { PasswordLoginService } from "../services/password-login.service";

export class PasswordLoginDto extends createZodDto(
  PasswordLoginService.inputSchema,
) {}
