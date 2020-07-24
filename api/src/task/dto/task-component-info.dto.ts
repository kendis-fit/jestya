import { Component } from "../../component/component.entity";
import { ApiProperty } from "@nestjs/swagger";

export class TaskComponentInfo {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	constructor(component: Component) {
		this.id = component.id;
		this.name = component.name;
	}
}
