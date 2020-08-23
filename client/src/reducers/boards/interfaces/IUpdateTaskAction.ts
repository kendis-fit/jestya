import { ITask } from "../../../api/boardProjects";
import { UPDATE_TASK } from "../../constants";

export interface IUpdateTask {
	boardId: string;
	task: ITask;
}

export interface IUpdateTaskAction {
	type: typeof UPDATE_TASK;
	value: IUpdateTask;
}
