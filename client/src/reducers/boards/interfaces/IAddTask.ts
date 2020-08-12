import { ADD_TASK } from "../../constants";
import { IAddTaskValues } from "../../../api/boardProjects";

export interface IAddTask {
	type: typeof ADD_TASK;
	value: IAddTaskValues;
}
