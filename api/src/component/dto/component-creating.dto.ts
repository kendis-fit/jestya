import { ApiProperty } from "@nestjs/swagger";

import { Component } from "../component.entity";
import { IsNotEmpty, IsString } from "class-validator";

export class ComponentCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public name: string;

	constructor(component: Component) {
		this.name = component.name;
	}
}
