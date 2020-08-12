import { REMOVE_TASK } from "../../constants";
import { IRemoveTaskValues } from "../../../api/boardProjects";

export interface IRemoveTask {
	type: typeof REMOVE_TASK;
	value: IRemoveTaskValues;
}
