import { REMOVE_TASK } from "../../constants";

export interface IRemoveTask {
	type: typeof REMOVE_TASK;
	value: string;
}
