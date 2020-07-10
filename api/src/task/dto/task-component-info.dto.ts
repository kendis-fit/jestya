import { Component } from "../../component/component.entity";

export class TaskComponentInfo {
	public id: string;
	public name: string;

	constructor(component: Component) {
		this.id = component.id;
		this.name = component.name;
	}
}
