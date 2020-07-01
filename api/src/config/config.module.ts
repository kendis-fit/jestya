import { Module } from "@nestjs/common";

import { ConfigService } from "./config.service";
import { configProviders } from "./config.providers";

@Module({
	providers: [ConfigService, ...configProviders],
	exports: [ConfigService],
})
export class ConfigModule {}
