import { REMOVE_PROJECT } from "../../constants";

export interface IRemoveAction {
	type: typeof REMOVE_PROJECT;
	value: string;
}
