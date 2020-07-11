import { Test, TestingModule } from "@nestjs/testing";
import { ComponentService } from "./component.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Component } from "./component.entity";

describe("Component", () => {
	let service: ComponentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ComponentService,
				{
					provide: getRepositoryToken(Component),
					useValue: {},
				},
			],
		}).compile();

		service = module.get<ComponentService>(ComponentService);
	});

	describe("ComponentService", () => {
		it("should be defined", () => {
			expect(service).toBeDefined();
		});
	});
});
