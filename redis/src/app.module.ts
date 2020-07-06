import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import config from "../../.config";

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [config[process.env.NODE_ENV]],
			isGlobal: true,
		}),
	],
})
export class AppModule {}
