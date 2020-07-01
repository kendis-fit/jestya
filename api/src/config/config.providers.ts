import config from "../../../.config";
import { IConfig } from "./config.interface";

export const CONFIG_LOCALE = "CONFIG_LOCALE";

type Environment = "development" | "production" | "test";

export const configProviders = [
	{
		provide: CONFIG_LOCALE,
		useFactory: () => {
			const environment = process.env.NODE_ENV as Environment;
			return config[environment] as IConfig;
		},
	},
];
