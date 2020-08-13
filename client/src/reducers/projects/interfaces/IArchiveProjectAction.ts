import { ARCHIVE_PROJECT } from "../../constants";

export interface IArchiveProject {
	id: string;
	isArchive: boolean;
}

export interface IArchiveProjectAction {
	type: typeof ARCHIVE_PROJECT;
	value: IArchiveProject;
}
