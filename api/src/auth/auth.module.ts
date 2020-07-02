import { Module } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { ConfigModule } from "src/config/config.module";

@Module({
	imports: [ConfigModule],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
