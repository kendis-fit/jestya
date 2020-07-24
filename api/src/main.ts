import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import { createSwagger } from "./helpers/swagger.config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	createSwagger(app);
	await app.listen(process.env.PORT || "5000");
}
bootstrap();
