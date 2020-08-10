import { DRAG_BOARD } from "../../constants";
import { IDragIndexs } from "../../../api/boardProjects";

export interface IDragBoard {
	type: typeof DRAG_BOARD;
	value: IDragIndexs;
}
