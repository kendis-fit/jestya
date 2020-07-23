import { Controller, Get, UseGuards, Post, Body } from "@nestjs/common";
import { ApiTags, ApiOkResponse, ApiForbiddenResponse, ApiCreatedResponse } from "@nestjs/swagger";

import { Role } from "../user/user.entity";
import { JwtGuard } from "../guards/jwt/jwt.guard";
import { Error } from "../helpers/error.interfaces";
import { RoleGuard } from "../guards/role/role.guard";
import { ComponentService } from "./component.service";
import { ComponentInfo } from "./dto/component-info.dto";
import { ComponentCreated } from "./dto/component-created.dto";
import { ComponentCreating } from "./dto/component-creating.dto";

@ApiTags("components")
@Controller("components")
export class ComponentController {
	constructor(private readonly componentService: ComponentService) {}

	@ApiOkResponse({ type: [ComponentInfo] })
	@ApiForbiddenResponse({ type: Error })
	@Get()
	@UseGuards(JwtGuard)
	public async findAll(): Promise<ComponentInfo[]> {
		const components = await this.componentService.findAll();
		return components.map(component => new ComponentInfo(component));
	}

	@ApiCreatedResponse({ type: ComponentCreated })
	@ApiForbiddenResponse({ type: Error })
	@Post()
	@UseGuards(JwtGuard, new RoleGuard([Role.ADMIN, Role.SUPER_ADMIN]))
	public async create(@Body() component: ComponentCreating): Promise<ComponentCreated> {
		const newComponent = await this.componentService.create(component);
		return new ComponentCreated(newComponent);
	}
}
