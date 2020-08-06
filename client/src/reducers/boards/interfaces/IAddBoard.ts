import { ADD_BOARD } from "../../constants";
import { IBoard } from "../../../api/boardProjects";

export interface IAddBoard {
	type: typeof ADD_BOARD;
	value: IBoard;
}
