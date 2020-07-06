import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { databaseProviders } from "./database.providers";
import { DatabaseService } from "./database.service";

@Module({
	imports: [ConfigModule],
	providers: [...databaseProviders, DatabaseService],
	exports: [...databaseProviders],
})
export class DatabaseModule {}
