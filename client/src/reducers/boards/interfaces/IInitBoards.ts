import { INIT_BOARDS } from "../../constants";
import { IBoard } from "../../../api/boardProjects";

export interface IInitBoards {
	type: typeof INIT_BOARDS;
	value: IBoard[];
}
