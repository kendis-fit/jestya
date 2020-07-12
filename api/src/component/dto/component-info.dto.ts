import { ApiProperty } from "@nestjs/swagger";

import { Component } from "../component.entity";

export class ComponentInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	constructor(component: Component) {
		this.id = component.id;
		this.name = component.name;
	}
}
