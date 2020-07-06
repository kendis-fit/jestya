import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";

import config from "../../.config";
import { AppModule } from "./app.module";

const logger = new Logger("Redis");
const redis = config[process.env.NODE_ENV].redis;

async function bootstrap() {
	const app = await NestFactory.createMicroservice(AppModule, {
		transport: Transport.REDIS,
		options: {
			url: `redis://${redis.host}:${redis.port}`,
		},
	});
	await app.listen(() => logger.log("Redis microservice is listening"));
}
bootstrap();
