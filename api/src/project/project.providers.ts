import { model } from "mongoose";

import { IProject } from "./project.interface";
import { projectShema } from "./project.entity";

export const PROJECT_MODEL = "PROJECT_MODEL";

export const ProjectModel = model<IProject>("Project", projectShema);

export const projectProviders = [
	{
		provide: PROJECT_MODEL,
		useValue: ProjectModel,
	},
];
