import { combineReducers } from "redux";

import { IProject } from "../api/project";
import projects from "./projects/projects";

export interface IRootState {
	projects: IProject[];
}

export default combineReducers({ projects });
