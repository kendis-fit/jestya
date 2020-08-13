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
	DRAG_TASK,
} from "../constants";
import { ChangePositionInArray } from "./boardsHelpers";

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
		case DRAG_BOARD:
			return ChangePositionInArray(state, action.value.startIndex, action.value.endIndex);
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

		case DRAG_TASK: {
			//drop task in same board
			if (action.value.dropInBoardId === action.value.dropOutBoardId) {
				const BoardIndex = state.findIndex(
					board => board.id === action.value.dropInBoardId
				);
				const Board = state[BoardIndex];
				Board.tasks = ChangePositionInArray(
					Board.tasks,
					action.value.dropOutPosition,
					action.value.dropInPosition
				);
				return [...state.slice(0, BoardIndex), Board, ...state.slice(BoardIndex + 1)];
			}
			//drop task to other board
			const boardDropInIndex = state.findIndex(
				board => board.id === action.value.dropInBoardId
			);
			const boardDropOutIndex = state.findIndex(
				board => board.id === action.value.dropOutBoardId
			);

			const DropOutBoard = { ...state[boardDropOutIndex] };
			const DropInBoard = { ...state[boardDropInIndex] };

			DropOutBoard.tasks = state[boardDropOutIndex].tasks.filter(
				task => task.id !== state[boardDropOutIndex].tasks[action.value.dropOutPosition].id
			); //Deleting draging task from board

			DropInBoard.tasks.splice(
				action.value.dropInPosition,
				0,
				state[boardDropOutIndex].tasks[action.value.dropOutPosition]
			);
			const result = state.filter(
				board => board.id !== DropOutBoard.id && board.id !== DropInBoard.id
			);
			result.splice(boardDropInIndex, 0, DropInBoard);
			result.splice(boardDropOutIndex, 0, DropOutBoard);

			return result;
		}
		default:
			return state;
	}
};

export default boards;
