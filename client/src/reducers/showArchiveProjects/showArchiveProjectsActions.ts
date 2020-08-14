import { IShowArchiveProjectsAction } from "./interfaces/IShowArchiveProjectsAction";
import { SHOW_ARCHIVE_PROJECTS } from "../constants";

export const showArchiveProjects = (showArchive: boolean): IShowArchiveProjectsAction => ({
	type: SHOW_ARCHIVE_PROJECTS,
	value: showArchive,
});

export type ShowArchiveProjectsActions = IShowArchiveProjectsAction;
