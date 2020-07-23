import { ApiProperty } from "@nestjs/swagger";

import { Component } from "../component.entity";

export class ComponentCreating {
	@ApiProperty()
	public name: string;

	constructor(component: Component) {
		this.name = component.name;
	}
}
