import { combineReducers } from "redux";

import boards from "./boards";
import project from "./project";
import projects from "./projects";
import { IBoard } from "../api/boardProjects";
import { IProject as IProjects } from "../api/project";
import { IProject } from "./project/interfaces/IProject";

export interface IRootState {
	projects: IProjects[];
	boards: IBoard[];
	project: IProject | null;
}

export default combineReducers({ projects, boards, project });
