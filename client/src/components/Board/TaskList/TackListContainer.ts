import { Dispatch } from "redux";
import { connect } from "react-redux";

import TaskList from "./TaskList";
import { IRemoveTaskValues } from "../../../api/boardProjects";
import { IAddTask, IAddTaskAction } from "../../../reducers/boards/interfaces/IAddTask";
import { addTask, removeTask } from "../../../reducers/boards/boardActions";
import { IRemoveTask } from "../../../reducers/boards/interfaces/IRemoveTask";

const mapDispatchToProps = (dispatch: Dispatch<IAddTaskAction | IRemoveTask>) => ({
	addTask: (value: IAddTask) => dispatch(addTask(value)),
	removeTask: (value: IRemoveTaskValues) => dispatch(removeTask(value)),
});

const TackListContainer = connect(null, mapDispatchToProps);

export default TackListContainer(TaskList);
