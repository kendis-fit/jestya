import { ITask } from "../../api/boardProjects";
import { ADD_TASK, REMOVE_TASK, INIT_TASKS, DRAG_TASK } from "../constants";
import { IInitTasks } from "./interfaces/IInitialTask";
import { IRemoveTask } from "./interfaces/IRemoveTask";
import { IAddTask } from "./interfaces/IAddTask";

export const addTask = (task: ITask): IAddTask => ({
	type: ADD_TASK,
	value: task,
});

export const removeTask = (id: string): IRemoveTask => ({
	type: REMOVE_TASK,
	value: id,
});

export const initTasks = (tasks: ITask[]): IInitTasks => ({
	type: INIT_TASKS,
	value: tasks,
});

// export const dragTask = (result: IDragIndexs): IDragBoard => ({
// 	value: result,
// 	type: DRAG_TASK,
// });

export type TaskActions = IInitTasks | IAddTask | IRemoveTask;
