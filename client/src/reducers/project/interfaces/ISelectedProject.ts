import { IProject } from "./IProject";
import { SELECT_PROJECT } from "../../constants";

export interface ISelectedProject {
	type: typeof SELECT_PROJECT;
	value: IProject | null;
}
