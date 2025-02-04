import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { HealtCheckModule } from "./modules/health-check.module";

@Module({
  imports: [HealtCheckModule, AuthModule],
})
export class AppModule {}
