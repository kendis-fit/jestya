import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from "@nestjs/microservices";

import { AppModule } from './app.module';

const logger = new Logger("Redis");

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
	transport: Transport.REDIS,
	options: {
		url: "redis://localhost:6379"
	}
  });
  await app.listen(() => logger.log("Redis microservice is listening"));
}
bootstrap();
