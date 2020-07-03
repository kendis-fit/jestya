import { model } from "mongoose";

import { IProject } from "./project.interface";
import { projectShema } from "./project.entity";

export const PROJECT_MODEL = "PROJECT_MODEL";

export const projectProviders = [
	{
		provide: PROJECT_MODEL,
		useValue: model<IProject>("Project", projectShema),
	},
];
