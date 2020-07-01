import { Injectable, Inject } from "@nestjs/common";

import { IConfig } from "./config.interface";
import { CONFIG_LOCALE } from "./config.providers";

@Injectable()
export class ConfigService {
	constructor(@Inject(CONFIG_LOCALE) public readonly config: IConfig) {}
}
