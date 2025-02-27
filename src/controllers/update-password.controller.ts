import { Body, Controller, Patch, Post } from "@nestjs/common";
import { UpdatePasswordDto } from "src/dtos/update-password.dto";
import { HashPasswordService } from "../services/hash-password.service";

@Controller("update-password")
export class UpdatePasswordController {
  constructor(private readonly hashPasswordService: HashPasswordService) {}

  @Patch()
  async updatePassword(@Body() data: UpdatePasswordDto) {
    return this.hashPasswordService.execute({ password: data.newPassword });
  }
}
