import { Project } from "./project.entity";

export const PROJECT_REPOSITORY = "PROJECT_REPOSITORY";

export const projectProviders = [
	{
		provide: PROJECT_REPOSITORY,
		useValue: Project,
	},
];
