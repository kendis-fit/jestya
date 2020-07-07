import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthModule } from "src/auth/auth.module";
import { UserController } from "./user.controller";

@Module({
	imports: [AuthModule, TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
