import { TaskActions } from "../tasks/tasksActions";
import { ITask, IBoard } from "../../api/boardProjects";
import { ADD_TASK, INIT_TASKS, REMOVE_TASK } from "../constants";

const tasks = (state: IBoard[] = [], action: TaskActions) => {
	switch (action.type) {
		case ADD_TASK:
			return [...state, action.value];
		case INIT_TASKS:
			return action.value;
		case REMOVE_TASK:
			return state.filter(task => task.id !== action.value);
		default:
			return state;
	}
};

export default tasks;
