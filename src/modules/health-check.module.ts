import { Module } from "@nestjs/common";
import { HealtCheckController } from "../controllers/health-check.controller";
import { HealtCheckService } from "../services/health-check.service";

@Module({
  imports: [],
  controllers: [HealtCheckController],
  providers: [HealtCheckService],
})
export class HealtCheckModule {}
