import {
	IBoard,
	IDragIndexs,
	IAddTaskValues,
	IRemoveTaskValues,
	ITask,
	IDragTaskData,
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
} from "../constants";
import { IAddBoard } from "./interfaces/IAddBoard";
import { IInitBoards } from "./interfaces/IInitBoards";
import { IUpdateBoardAction, IUpdateBoard } from "./interfaces/IUpdateBoardAction";
import { IRemoveBoard } from "./interfaces/IRemoveBoard";
import { IDragBoard } from "./interfaces/IDragBoard";
import { IAddTask } from "./interfaces/IAddTask";
import { IRemoveTask } from "./interfaces/IRemoveTask";
import { IInitTasks } from "./interfaces/IInitialTask";
import IDragTask from "./interfaces/IDragTask";

export const addBoard = (board: IBoard): IAddBoard => ({
	type: ADD_BOARD,
	value: board,
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

export const addTask = (result: IAddTaskValues): IAddTask => ({
	type: ADD_TASK,
	value: result,
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
	value: value,
});
export type BoardActions =
	| IAddBoard
	| IRemoveBoard
	| IInitBoards
	| IDragBoard
	| IInitTasks
	| IAddTask
	| IRemoveTask
	| IUpdateBoardAction
	| IDragTask;
