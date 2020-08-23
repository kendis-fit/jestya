import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IRemoveTaskValues } from "../../../api/boardProjects";
import { IAddTask, IAddTaskAction } from "../../../reducers/boards/interfaces/IAddTask";
import { addTask, removeTask, updateTask } from "../../../reducers/boards/boardActions";
import { IRemoveTask } from "../../../reducers/boards/interfaces/IRemoveTask";
import TaskWindow from "./TaskWindow";
import {
	IUpdateTask,
	IUpdateTaskAction,
} from "../../../reducers/boards/interfaces/IUpdateTaskAction";

const mapDispatchToProps = (
	dispatch: Dispatch<IAddTaskAction | IRemoveTask | IUpdateTaskAction>
) => ({
	addTask: (value: IAddTask) => dispatch(addTask(value)),
	removeTask: (value: IRemoveTaskValues) => dispatch(removeTask(value)),
	updateTask: (value: IUpdateTask) => dispatch(updateTask(value)),
});

const TaskWindowContainer = connect(null, mapDispatchToProps);

export default TaskWindowContainer(TaskWindow);
