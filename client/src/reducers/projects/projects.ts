import { IProject } from "../../api/project";
import { ProjectActions } from "./projectsActions";
import { ADD_PROJECT, INIT_PROJECTS, REMOVE_PROJECT } from "../constants";

const projects = (state: IProject[] = [], action: ProjectActions) => {
	switch (action.type) {
		case ADD_PROJECT:
			return [...state, action.value];
		case INIT_PROJECTS:
			return action.value;
		case REMOVE_PROJECT:
			return state.filter(project => project.id !== action.value);
		default:
			return state;
	}
};

export default projects;
