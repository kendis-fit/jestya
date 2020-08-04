import { ADD_PROJECT } from "../../constants";
import { IAddProject } from "../../../api/project";

export interface IAddProjectAction {
	type: typeof ADD_PROJECT;
	value: IAddProject;
}
