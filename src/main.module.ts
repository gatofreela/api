import { Module } from "@nestjs/common";
import { HealtCheckModule } from "./modules/health-check.module";

@Module({
  imports: [HealtCheckModule],
})
export class AppModule {}
