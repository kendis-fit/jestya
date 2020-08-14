import { IProject } from "../../api/project";
import { ProjectActions } from "./projectsActions";
import { ADD_PROJECT, INIT_PROJECTS, ARCHIVE_PROJECT } from "../constants";

const projects = (state: IProject[] = [], action: ProjectActions) => {
	switch (action.type) {
		case ADD_PROJECT:
			return [...state, action.value];
		case INIT_PROJECTS:
			return action.value;
		case ARCHIVE_PROJECT:
			return state.map(project => {
				if (project.id === action.value.id) {
					return { ...project, isArchive: action.value.isArchive };
				}
				return project;
			});
		default:
			return state;
	}
};

export default projects;
