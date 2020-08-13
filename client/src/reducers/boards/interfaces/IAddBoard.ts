import { ADD_BOARD } from "../../constants";
import { IAddBoardValues } from "../../../api/boardProjects";

export interface IAddBoard {
	type: typeof ADD_BOARD;
	value: IAddBoardValues;
}
