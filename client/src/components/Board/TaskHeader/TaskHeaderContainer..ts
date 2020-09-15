import { Dispatch } from "redux";
import { connect } from "react-redux";

import { IRemoveTaskValues } from "../../../api/boardProjects";
import { removeTask } from "../../../reducers/boards/boardActions";
import { IRemoveTask } from "../../../reducers/boards/interfaces/IRemoveTask";
import TaskHeader from "./TaskHeader";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveTask>) => ({
	removeTask: (value: IRemoveTaskValues) => dispatch(removeTask(value)),
});

const TaskHeaderContainer = connect(null, mapDispatchToProps);

export default TaskHeaderContainer(TaskHeader);
