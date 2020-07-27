import { plainToClass } from "class-transformer";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Test, TestingModule } from "@nestjs/testing";

import { Component } from "./component.entity";
import { ComponentService } from "./component.service";
import { ComponentCreating } from "./dto/component-creating.dto";

interface IComponentRepositoryMock {
	save: jest.Mock;
	find: jest.Mock;
}

describe("Component service", () => {
	let service: ComponentService;
	let componentRepository: IComponentRepositoryMock;

	beforeEach(async () => {
		componentRepository = {
			save: jest.fn(),
			find: jest.fn(),
		};
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ComponentService,
				{
					provide: getRepositoryToken(Component),
					useValue: componentRepository,
				},
			],
		}).compile();

		service = module.get<ComponentService>(ComponentService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	let component: Component;

	beforeEach(() => {
		component = new Component();
	});

	describe("method create", () => {
		beforeEach(() => {
			component.name = "component";
			componentRepository.save.mockReturnValue(component);
		});

		it("should be equal", async () => {
			const newComponent = await service.create(plainToClass(ComponentCreating, component));
			expect(newComponent).toEqual(component);
		});
	});

	describe("method findAll", () => {
		let components: Component[];

		beforeEach(() => {
			components = [new Component(), new Component()];
			componentRepository.find.mockReturnValue(components);
		});

		it("should be equal", async () => {
			const foundComponents = await service.findAll();
			expect(foundComponents).toEqual(components);
		});
	});
});
