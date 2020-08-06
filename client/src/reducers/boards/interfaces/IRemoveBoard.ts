import { REMOVE_BOARD } from "../../constants";

export interface IRemoveBoard {
	type: typeof REMOVE_BOARD;
	value: string;
}
