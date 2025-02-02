import { Controller, Get } from "@nestjs/common";
import { AppService } from "../services/health-check.service";

@Controller("health-check")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
