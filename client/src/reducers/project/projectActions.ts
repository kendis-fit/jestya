import { IProject } from "./interfaces/IProject";
import { ISelectedProject } from "./interfaces/ISelectedProject";
import { SELECT_PROJECT } from "../constants";

export const selectProject = (project: IProject): ISelectedProject => ({
	type: SELECT_PROJECT,
	value: project,
});

export type ProjectActions = ISelectedProject;
