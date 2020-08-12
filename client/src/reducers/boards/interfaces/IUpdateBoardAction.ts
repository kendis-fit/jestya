import { UPDATE_BOARD } from "../../constants";

export interface IUpdateBoard {
	id: string;
	board: {
		id?: string;
		name?: string;
		icon?: string;
		color?: string;
		description?: string;
	};
}

export interface IUpdateBoardAction {
	type: typeof UPDATE_BOARD;
	value: IUpdateBoard;
}
