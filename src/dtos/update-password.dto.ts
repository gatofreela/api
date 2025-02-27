import { createZodDto } from "nestjs-zod";
import { UpdatePasswordService } from "src/services/update-password.service";

export class UpdatePasswordDto extends createZodDto(
  UpdatePasswordService.inputSchema,
) {}
