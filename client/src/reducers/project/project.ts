import { IProject } from "./interfaces/IProject";
import { ProjectActions } from "./projectActions";
import { SELECT_PROJECT } from "../constants";

const project = (state: IProject | null = null, action: ProjectActions) => {
	switch (action.type) {
		case SELECT_PROJECT:
			return action.value;
		default:
			return state;
	}
};

export default project;
