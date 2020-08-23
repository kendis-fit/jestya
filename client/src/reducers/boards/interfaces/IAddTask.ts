import { ADD_TASK } from "../../constants";
import { ITask } from "../../../api/boardProjects";
// import { IAddTaskValues } from "../../../api/boardProjects";

export interface IAddTask {
	task: ITask;
	boardId: string;
}

export interface IAddTaskAction {
	type: typeof ADD_TASK;
	value: IAddTask;
}
