import { Body, Controller, Post } from "@nestjs/common";
import { PasswordLoginDto } from "../dtos/password-login.dto";
import { PasswordRegisterDto } from "../dtos/password-register.dto";
import { PasswordLoginService } from "../services/password-login.service";
import { PasswordRegisterService } from "../services/password-register.service";

@Controller({ version: "1", path: "auth" })
export class AuthController {
  constructor(
    private readonly passwordLoginService: PasswordLoginService,
    private readonly passwordRegisterService: PasswordRegisterService,
  ) {}

  @Post("login")
  async login(@Body() credentials: PasswordLoginDto) {
    return this.passwordLoginService.execute(credentials);
  }

  @Post("register")
  async register(@Body() credentials: PasswordRegisterDto) {
    return this.passwordRegisterService.execute(credentials);
  }
}
