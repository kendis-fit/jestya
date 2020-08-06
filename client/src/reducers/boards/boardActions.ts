import { ADD_BOARD } from "../constants";
import { IBoard } from "../../api/boardProjects";
import { IAddBoard } from "./interfaces/IAddBoard";

export const addBoard = (board: IBoard): IAddBoard => ({
	type: ADD_BOARD,
	value: board,
});

export type BoardActions = IAddBoard;
