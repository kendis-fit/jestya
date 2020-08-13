import { SHOW_ARCHIVE_PROJECTS } from "../../constants";

export interface IShowArchiveProjectsAction {
	type: typeof SHOW_ARCHIVE_PROJECTS;
	value: boolean;
}
