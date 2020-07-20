import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthService } from "./auth.service";
import { UserModule } from "../user/user.module";
import { TaskModule } from "../task/task.module";
import { AuthController } from "./auth.controller";
import { ProjectModule } from "../project/project.module";
import { JwtStrategy } from "../strategies/jwt/jwt.strategy";
import { JwtTasksStrategy } from "../strategies/jwt-tasks/jwt-tasks.strategy";
import { JwtProjectsStrategy } from "../strategies/jwt-projects/jwt-projects.strategy";

@Module({
	imports: [
		ConfigModule,
		UserModule,
		ProjectModule,
		TaskModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: (config: ConfigService) => ({
				secret: config.get<string>("jwt.secretKey"),
				signOptions: { expiresIn: "10h" },
			}),
			inject: [ConfigService],
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, JwtProjectsStrategy, JwtTasksStrategy],
})
export class AuthModule {}
