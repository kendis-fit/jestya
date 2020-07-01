import { Module } from "@nestjs/common";

import { UserService } from "./user.service";
import { userProviders } from "./user.providers";
import { UserController } from "./user.controller";
import { DatabaseModule } from "../database/database.module";

@Module({
	imports: [DatabaseModule],
	providers: [UserService, ...userProviders],
	controllers: [UserController],
})
export class UserModule {}
