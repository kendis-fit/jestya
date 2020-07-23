import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Component } from "./component.entity";
import { ComponentCreating } from "./dto/component-creating.dto";

@Injectable()
export class ComponentService {
	constructor(
		@InjectRepository(Component)
		private readonly componentRepository: Repository<Component>
	) {}

	public async create(component: ComponentCreating): Promise<Component> {
		const newComponent = new Component();
		newComponent.name = component.name;

		await this.componentRepository.save(newComponent);
		return newComponent;
	}

	public async findAll(): Promise<Component[]> {
		const components = await this.componentRepository.find();
		return components;
	}

	public async findByIds(componentIds: string[]): Promise<Component[]> {
		const components = await this.componentRepository.findByIds(componentIds);
		return components;
	}
}
