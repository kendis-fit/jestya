import { Dispatch } from "redux";
import { connect } from "react-redux";

import TaskList from "./TaskList";
import { IAddTaskValues, IRemoveTaskValues } from "../../../api/boardProjects";
import { IAddTask } from "../../../reducers/boards/interfaces/IAddTask";
import { addTask, removeTask } from "../../../reducers/boards/boardActions";
import { IRemoveTask } from "../../../reducers/boards/interfaces/IRemoveTask";

const mapDispatchToProps = (dispatch: Dispatch<IAddTask | IRemoveTask>) => ({
	addTask: (value: IAddTaskValues) => dispatch(addTask(value)),
	removeTask: (value: IRemoveTaskValues) => dispatch(removeTask(value)),
});

const TackListContainer = connect(null, mapDispatchToProps);

export default TackListContainer(TaskList);
