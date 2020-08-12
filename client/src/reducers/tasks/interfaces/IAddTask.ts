import { ADD_TASK } from "../../constants";
import { ITask } from "../../../api/boardProjects";

export interface IAddTask {
	type: typeof ADD_TASK;
	value: ITask;
}
