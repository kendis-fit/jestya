import { ADD_BOARD } from "../constants";
import { BoardActions } from "./boardActions";
import { IBoard } from "../../api/boardProjects";

const boards = (store: IBoard[] = [], action: BoardActions) => {
	switch (action.type) {
		case ADD_BOARD:
			return [...store, action.value];
		default:
			return store;
	}
};

export default boards;
