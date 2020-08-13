import { combineReducers } from "redux";

import boards from "./boards";
import projects from "./projects";
import searchProject from "./searchProject";
import { IBoard } from "../api/boardProjects";
import { IProject as IProjects } from "../api/project";
import showArchiveProjects from "./showArchiveProjects";

export interface IRootState {
	projects: IProjects[];
	boards: IBoard[];
	searchProject: string;
	showArchiveProjects: boolean;
}

export default combineReducers({ projects, boards, searchProject, showArchiveProjects });
