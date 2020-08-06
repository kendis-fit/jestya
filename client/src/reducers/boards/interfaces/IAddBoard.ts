import { ADD_BOARD } from "../../constants";
import { IBoard } from "../../../components/Board/BoardHeader/BoardHeader";

export interface IAddBoard {
	type: typeof ADD_BOARD;
	value: IBoard;
}
