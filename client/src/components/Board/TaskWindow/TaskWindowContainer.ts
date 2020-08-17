import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IAddTaskValues, IRemoveTaskValues } from "../../../api/boardProjects";
import { IAddTask } from "../../../reducers/boards/interfaces/IAddTask";
import { addTask, removeTask } from "../../../reducers/boards/boardActions";
import { IRemoveTask } from "../../../reducers/boards/interfaces/IRemoveTask";
import TaskWindow from "./TaskWindow";

const mapDispatchToProps = (dispatch: Dispatch<IAddTask | IRemoveTask>) => ({
	addTask: (value: IAddTaskValues) => dispatch(addTask(value)),
	removeTask: (value: IRemoveTaskValues) => dispatch(removeTask(value)),
});

const TaskWindowContainer = connect(null, mapDispatchToProps);

export default TaskWindowContainer(TaskWindow);
