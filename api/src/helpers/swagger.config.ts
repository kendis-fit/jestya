import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const createSwagger = (app: INestApplication) => {
	const option = new DocumentBuilder()
		.setTitle("Jestya API")
		.setDescription("A main api for jestya application")
		.setVersion("1.0.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, option);
	SwaggerModule.setup("api", app, document);
};
