import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./user.entity";
import { UserService } from "./user.service";
import { AuthModule } from "../auth/auth.module";
import { UserController } from "./user.controller";

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
