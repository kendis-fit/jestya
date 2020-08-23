import {
	IBoard,
	IDragIndexs,
	IRemoveTaskValues,
	ITask,
	IDragTaskData,
	IAddBoardValues,
} from "../../api/boardProjects";
import {
	ADD_BOARD,
	REMOVE_BOARD,
	INIT_BOARDS,
	UPDATE_BOARD,
	DRAG_BOARD,
	ADD_TASK,
	REMOVE_TASK,
	INIT_TASKS,
	DRAG_TASK,
	UPDATE_TASK,
} from "../constants";
import { IAddBoard } from "./interfaces/IAddBoard";
import { IInitBoards } from "./interfaces/IInitBoards";
import { IUpdateBoardAction, IUpdateBoard } from "./interfaces/IUpdateBoardAction";
import { IRemoveBoard } from "./interfaces/IRemoveBoard";
import { IDragBoard } from "./interfaces/IDragBoard";
import { IAddTask, IAddTaskAction } from "./interfaces/IAddTask";
import { IRemoveTask } from "./interfaces/IRemoveTask";
import { IInitTasks } from "./interfaces/IInitialTask";
import IDragTask from "./interfaces/IDragTask";
import { IUpdateTaskAction, IUpdateTask } from "./interfaces/IUpdateTaskAction";

export const addBoard = (value: IAddBoardValues): IAddBoard => ({
	type: ADD_BOARD,
	value,
});

export const removeBoard = (id: string): IRemoveBoard => ({
	type: REMOVE_BOARD,
	value: id,
});

export const initBoards = (boards: IBoard[]): IInitBoards => ({
	type: INIT_BOARDS,
	value: boards,
});

export const updateBoard = (board: IUpdateBoard): IUpdateBoardAction => ({
	type: UPDATE_BOARD,
	value: board,
});

export const dragBoard = (result: IDragIndexs): IDragBoard => ({
	value: result,
	type: DRAG_BOARD,
});

export const addTask = (result: IAddTask): IAddTaskAction => ({
	type: ADD_TASK,
	value: result,
});

export const updateTask = (value: IUpdateTask): IUpdateTaskAction => ({
	type: UPDATE_TASK,
	value,
});

export const removeTask = (objOfId: IRemoveTaskValues): IRemoveTask => ({
	type: REMOVE_TASK,
	value: objOfId,
});

export const initTasks = (tasks: ITask[]): IInitTasks => ({
	type: INIT_TASKS,
	value: tasks,
});

export const dragTask = (value: IDragTaskData): IDragTask => ({
	type: DRAG_TASK,
	value,
});
export type BoardActions =
	| IAddBoard
	| IRemoveBoard
	| IInitBoards
	| IDragBoard
	| IInitTasks
	| IAddTaskAction
	| IRemoveTask
	| IUpdateBoardAction
	| IUpdateTaskAction
	| IDragTask;
