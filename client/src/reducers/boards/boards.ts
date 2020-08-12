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
	UPDATE_BOARD,
} from "../constants";

const boards = (state: IBoard[] = [], action: BoardActions) => {
	switch (action.type) {
		case ADD_BOARD:
			return [...state, action.value];
		case REMOVE_BOARD:
			return state.filter(board => board.id !== action.value);
		case INIT_BOARDS:
			return action.value;
		case UPDATE_BOARD:
			console.log(action);
			return state.map(board => {
				if (board.id === action.value.id) {
					return { ...board, ...action.value.board };
				}
				return board;
			});
		case DRAG_BOARD: {
			const BoardList = [
				...state.slice(0, action.value.startIndex),
				...state.slice(action.value.startIndex + 1),
			];
			BoardList.splice(action.value.endIndex, 0, state[action.value.startIndex]);
			return BoardList;
		}
		case ADD_TASK: {
			const boardIndex = state.findIndex(board => board.id === action.value.boardId);
			const board = state[boardIndex];
			board.tasks.push(action.value.task);
			return [...state.slice(0, boardIndex), board, ...state.slice(boardIndex + 1)];
		}

		case INIT_TASKS: {
			return action.value;
		}

		case REMOVE_TASK: {
			const boardIndex = state.findIndex(board => board.id === action.value.boardId);
			const taskList = state[boardIndex];
			taskList.tasks = state[boardIndex].tasks.filter(
				task => task.id !== action.value.taskId
			);
			return [...state.slice(0, boardIndex), taskList, ...state.slice(boardIndex + 1)];
		}
		default:
			return state;
	}
};

export default boards;
