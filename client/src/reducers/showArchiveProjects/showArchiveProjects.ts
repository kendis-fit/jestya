import { SHOW_ARCHIVE_PROJECTS } from "../constants";
import { ShowArchiveProjectsActions } from "./showArchiveProjectsActions";

const showArchiveProjects = (state: boolean = false, action: ShowArchiveProjectsActions) => {
	switch (action.type) {
		case SHOW_ARCHIVE_PROJECTS:
			return action.value;
		default:
			return state;
	}
};

export default showArchiveProjects;
