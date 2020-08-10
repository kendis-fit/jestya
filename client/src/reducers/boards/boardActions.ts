import { IBoard, IDragIndexs } from "../../api/boardProjects";
import { IAddBoard } from "./interfaces/IAddBoard";
import { IInitBoards } from "./interfaces/IInitBoards";
import { IUpdateBoard } from "./interfaces/IUpdateBoard";
import { IRemoveBoard } from "./interfaces/IRemoveBoard";
import { ADD_BOARD, REMOVE_BOARD, INIT_BOARDS, UPDATE_BOARD, DRAG_BOARD } from "../constants";
import { IDragBoard } from "./interfaces/IDragBoard";

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

export const updateBoard = (): IUpdateBoard => ({
	type: UPDATE_BOARD,
});

export const dragBoard = (result: IDragIndexs): IDragBoard => ({
	value: result,
	type: DRAG_BOARD,
});

export type BoardActions = IAddBoard | IRemoveBoard | IInitBoards | IDragBoard;
