import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { HealtCheckService } from "../services/health-check.service";

@Controller({ version: "1", path: "health-check" })
export class HealtCheckController {
  constructor(private readonly appService: HealtCheckService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("private")
  @UseGuards(JwtAuthGuard)
  getHelloPrivate(): string {
    return this.appService.getHello();
  }
}
