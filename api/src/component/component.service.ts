import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Component } from "./component.entity";

@Injectable()
export class ComponentService {
	constructor(
		@InjectRepository(Component)
		private readonly componentRepository: Repository<Component>
	) {}

	public async findAll(): Promise<Component[]> {
		const components = await this.componentRepository.find();
		return components;
	}

	public async findByIds(componentIds: string[]): Promise<Component[]> {
		const components = await this.componentRepository.findByIds(componentIds);
		return components;
	}
}
