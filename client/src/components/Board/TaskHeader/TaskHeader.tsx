import React from "react";
import { IRemoveTaskValues } from "../../../api/boardProjects";

export interface ITaskHeader {
	editing: boolean;
	readOnly: boolean;
	boardId: string;
	taskId: string;
	// functions
	removeTask: (value: IRemoveTaskValues) => void;
	onClose: () => void;
}

const TaskHeader = (props: ITaskHeader) => {
	const { boardId, taskId, readOnly, editing } = props;
	return (
		<div className="task-header">
			<h4>{editing ? "Editing task" : "Creating task"}</h4>
			<div className="">
				<div className="task-header__nav">
					{readOnly || !editing ? null : (
						<>
							<button
								className="task-header__nav-btn task-header__nav-btn--delete"
								onClick={() => {
									props.removeTask({
										boardId,
										taskId,
									});
									props.onClose();
								}}
							>
								Delete
							</button>
							<button className="task-header__nav-btn ">
								<span className="material-icons">archive</span>
							</button>
						</>
					)}

					<button className="task-header__nav-btn" onClick={props.onClose}>
						<span className="material-icons">close</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default TaskHeader;
