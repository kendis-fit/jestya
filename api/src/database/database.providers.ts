import { connect } from "mongoose";

import { ConfigService } from "../config/config.service";

export const DATABASE = "DATABASE";

export const databaseProviders = [
	{
		provide: DATABASE,
		useFactory: async (config: ConfigService) =>
			await connect(config.config.connectionString, { db: config.config.nameDatabase }),
		inject: [ConfigService],
	},
];
