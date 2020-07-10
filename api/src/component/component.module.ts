import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Component } from "./component.entity";
import { ComponentService } from "./component.service";

@Module({
	imports: [TypeOrmModule.forFeature([Component])],
	providers: [ComponentService],
	exports: [ComponentService],
})
export class ComponentModule {}
