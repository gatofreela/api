import { Controller, Get } from "@nestjs/common";
import { HealtCheckService } from "../services/health-check.service";

@Controller("health-check")
export class HealtCheckController {
  constructor(private readonly appService: HealtCheckService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
