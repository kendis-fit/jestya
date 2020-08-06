import { BoardActions } from "./boardActions";
import { IBoard } from "../../api/boardProjects";
import { ADD_BOARD, REMOVE_BOARD, INIT_BOARDS } from "../constants";

const boards = (store: IBoard[] = [], action: BoardActions) => {
	switch (action.type) {
		case ADD_BOARD:
			return [...store, action.value];
		case REMOVE_BOARD:
			return store.filter(board => board.id !== action.value);
		case INIT_BOARDS:
			return action.value;
		default:
			return store;
	}
};

export default boards;
