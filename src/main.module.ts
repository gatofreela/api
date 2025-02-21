import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth.module";
import { HealtCheckModule } from "./modules/health-check.module";
import { UserModule } from './modules/user.module';

@Module({
  imports: [HealtCheckModule, AuthModule, UserModule]
})
export class AppModule {}
