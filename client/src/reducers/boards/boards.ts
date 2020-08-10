import { BoardActions } from "./boardActions";
import { IBoard } from "../../api/boardProjects";
import { ADD_BOARD, REMOVE_BOARD, INIT_BOARDS, DRAG_BOARD } from "../constants";

const boards = (store: IBoard[] = [], action: BoardActions) => {
	switch (action.type) {
		case ADD_BOARD:
			return [...store, action.value];
		case REMOVE_BOARD:
			return store.filter(board => board.id !== action.value);
		case INIT_BOARDS:
			return action.value;
		case DRAG_BOARD: {
			const list = [
				...store.slice(0, action.value.startIndex),
				...store.slice(action.value.startIndex + 1),
			];
			list.splice(action.value.endIndex, 0, store[action.value.startIndex]);
			return list;
		}
		default:
			return store;
	}
};

export default boards;
