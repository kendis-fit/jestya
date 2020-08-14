import { IProject } from "../../api/project";
import { IAddProjectAction } from "./interfaces/IAddProjectAction";
import { IInitProjectsAction } from "./interfaces/IInitProjectsAction";
import { ADD_PROJECT, INIT_PROJECTS, ARCHIVE_PROJECT } from "../constants";
import { IArchiveProjectAction, IArchiveProject } from "./interfaces/IArchiveProjectAction";

export const addProject = (project: IProject): IAddProjectAction => ({
	type: ADD_PROJECT,
	value: project,
});

export const initProjects = (projects: IProject[]): IInitProjectsAction => ({
	type: INIT_PROJECTS,
	value: projects,
});

export const archiveProject = (project: IArchiveProject): IArchiveProjectAction => ({
	type: ARCHIVE_PROJECT,
	value: project,
});

export type ProjectActions = IAddProjectAction | IInitProjectsAction | IArchiveProjectAction;
