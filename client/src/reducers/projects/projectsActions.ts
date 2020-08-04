import { IProject } from "../../api/project";
import { IRemoveAction } from "./interfaces/IRemoveAction";
import { IAddProjectAction } from "./interfaces/IAddProjectAction";
import { IInitProjectsAction } from "./interfaces/IInitProjectsAction";
import { ADD_PROJECT, INIT_PROJECTS, REMOVE_PROJECT } from "../constants";

export const addProject = (project: IProject): IAddProjectAction => ({
	type: ADD_PROJECT,
	value: project,
});

export const initProjects = (projects: IProject[]): IInitProjectsAction => ({
	type: INIT_PROJECTS,
	value: projects,
});

export const removeProject = (id: string): IRemoveAction => ({
	type: REMOVE_PROJECT,
	value: id,
});

export type ProjectActions = IAddProjectAction | IInitProjectsAction | IRemoveAction;
