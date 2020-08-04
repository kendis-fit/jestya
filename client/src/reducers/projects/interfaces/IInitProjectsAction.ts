import { INIT_PROJECTS } from "../../constants";
import { IProject } from "../../../api/project";

export interface IInitProjectsAction {
	type: typeof INIT_PROJECTS;
	value: IProject[];
}
