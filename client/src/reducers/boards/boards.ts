import { BoardActions } from "./boardActions";
import { IBoard } from "../../api/boardProjects";
import {
	ADD_BOARD,
	REMOVE_BOARD,
	INIT_BOARDS,
	DRAG_BOARD,
	ADD_TASK,
	INIT_TASKS,
	REMOVE_TASK,
} from "../constants";

const boards = (store: IBoard[] = [], action: BoardActions) => {
	switch (action.type) {
		case ADD_BOARD:
			return [...store, action.value];
		case REMOVE_BOARD:
			return store.filter(board => board.id !== action.value);
		case INIT_BOARDS:
			return action.value;
		case DRAG_BOARD: {
			const BoardList = [
				...store.slice(0, action.value.startIndex),
				...store.slice(action.value.startIndex + 1),
			];
			BoardList.splice(action.value.endIndex, 0, store[action.value.startIndex]);
			return BoardList;
		}
		case ADD_TASK: {
			const boardIndex = store.findIndex(board => board.id === action.value.boardId);
			const board = store[boardIndex];
			board.tasks.push(action.value.task);
			return [...store.slice(0, boardIndex), board, ...store.slice(boardIndex + 1)];
		}

		case INIT_TASKS: {
			return action.value;
		}

		case REMOVE_TASK: {
			const boardIndex = store.findIndex(board => board.id === action.value.boardId);
			const taskList = store[boardIndex];
			taskList.tasks = store[boardIndex].tasks.filter(
				task => task.id !== action.value.taskId
			);
			return [...store.slice(0, boardIndex), taskList, ...store.slice(boardIndex + 1)];
		}
		default:
			return store;
	}
};

export default boards;
