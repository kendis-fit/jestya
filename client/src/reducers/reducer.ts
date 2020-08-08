import { combineReducers } from "redux";

import boards from "./boards";
import projects from "./projects";
import { IBoard } from "../api/boardProjects";
import { IProject as IProjects } from "../api/project";

export interface IRootState {
	projects: IProjects[];
	boards: IBoard[];
}

export default combineReducers({ projects, boards });
