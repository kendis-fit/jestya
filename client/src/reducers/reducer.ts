import { combineReducers } from "redux";

import boards from "./boards";
import projects from "./projects";
import { IProject } from "../api/project";
import { IBoard } from "../api/boardProjects";

export interface IRootState {
	projects: IProject[];
	boards: IBoard[];
}

export default combineReducers({ projects, boards });
