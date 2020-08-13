import { combineReducers } from "redux";

import boards from "./boards";
import projects from "./projects";
import { IBoard } from "../api/boardProjects";
import { IProject as IProjects } from "../api/project";
import searchProject from "./searchProject";

export interface IRootState {
	projects: IProjects[];
	boards: IBoard[];
	searchProject: string;
}

export default combineReducers({ projects, boards, searchProject });
