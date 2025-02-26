import { Controller, Post, Body, Patch } from "@nestjs/common";
import { HashPasswordService } from "../services/hash-password.service";
import { UpdatePasswordDto } from "src/dtos/update-password.dto";

@Controller('update-password')
export class UpdatePasswordController {
  constructor(private readonly hashPasswordService: HashPasswordService) {}

  @Patch()
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return this.hashPasswordService.execute({ password: data.newPassword })
  }
}