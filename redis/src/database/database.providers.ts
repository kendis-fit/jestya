import { RedisClient } from "redis";
import { ConfigService } from "@nestjs/config";

export const REDIS = "REDIS";

export const databaseProviders = [
	{
		provide: REDIS,
		useFactory: (config: ConfigService) => {
			const redis = new RedisClient({
				host: config.get<string>("redis.host"),
				port: config.get<number>("redis.port"),
			});
			return redis;
		},
		inject: [ConfigService],
	},
];
