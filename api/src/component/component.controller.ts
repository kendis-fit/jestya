import { ApiTags } from "@nestjs/swagger";
import { Controller, Get } from "@nestjs/common";

import { ComponentService } from "./component.service";
import { ComponentInfo } from "./dto/component-info.dto";

@ApiTags("components")
@Controller("components")
export class ComponentController {
	constructor(private readonly componentService: ComponentService) {}

	@Get()
	public async findAll(): Promise<ComponentInfo[]> {
		const components = await this.componentService.findAll();
		return components.map(component => new ComponentInfo(component));
	}
}
