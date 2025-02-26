import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { HealtCheckController } from "../controllers/health-check.controller";
import { HealtCheckService } from "../services/health-check.service";

@Module({
  imports: [PassportModule],
  controllers: [HealtCheckController],
  providers: [HealtCheckService],
})
export class HealtCheckModule {}
