import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { createSwagger } from "./helpers/swagger.config";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe({ validationError: { target: false, value: false } }));
	createSwagger(app);
	await app.listen(process.env.PORT || "5000");
}
bootstrap();
