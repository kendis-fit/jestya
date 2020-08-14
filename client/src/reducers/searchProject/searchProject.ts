import { SEARCH_PROJECTS } from "../constants";
import { SearchProjectActions } from "./searchProjectActions";

const searchProject = (state: string = "", action: SearchProjectActions) => {
	switch (action.type) {
		case SEARCH_PROJECTS:
			return action.value;
		default:
			return state;
	}
};

export default searchProject;
