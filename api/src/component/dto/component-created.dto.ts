import { ApiProperty } from "@nestjs/swagger";

import { Component } from "../component.entity";

export class ComponentCreated {
	@ApiProperty()
	public id: string;

	constructor(component: Component) {
		this.id = component.id;
	}
}
