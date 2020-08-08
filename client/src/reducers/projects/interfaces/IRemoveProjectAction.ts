import { REMOVE_PROJECT } from "../../constants";

export interface IRemoveProjectAction {
	type: typeof REMOVE_PROJECT;
	value: string;
}
