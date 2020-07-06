import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
	imports: [ConfigModule],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
