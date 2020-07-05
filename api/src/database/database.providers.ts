import { Sequelize } from "sequelize-typescript";

import { User, ProjectUser } from "src/user/user.entity";
import { ConfigService } from "../config/config.service";
import { Project } from "src/project/project.entity";

export const SEQUELIZE = "SEQUELIZE";

export const databaseProviders = [
	{
		provide: SEQUELIZE,
		useFactory: async (config: ConfigService) => {
			const sequelize = new Sequelize({
				dialect: "postgres",
				...config,
			});
			sequelize.addModels([User, Project, ProjectUser]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	},
];
