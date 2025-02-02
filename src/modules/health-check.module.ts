import { Module } from "@nestjs/common";
import { AppController } from "../controllers/health-check.controller";
import { AppService } from "../services/health-check.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
