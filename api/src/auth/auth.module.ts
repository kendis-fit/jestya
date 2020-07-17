import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { AuthController } from './auth.controller';
import { ProjectModule } from "../project/project.module";
import { JwtStrategy } from "../strategies/jwt/jwt.strategy";
import { JwtProjectsStrategy } from "../strategies/jwt-projects/jwt-projects.strategy";

@Module({
	imports: [ConfigModule, UserModule, ProjectModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtProjectsStrategy],
})
export class AuthModule {}
