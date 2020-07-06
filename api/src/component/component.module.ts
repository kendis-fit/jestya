import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Component } from "./component.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Component])],
})
export class ComponentModule {}
