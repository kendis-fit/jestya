import React from "react";
import { ITask } from "../../../api/boardProjects";

export interface IComponetTask extends ITask {
	isDragging?: boolean;
	onClick?: any;
}

const Task = ({ description = "", ...props }: IComponetTask) => {
	return (
		<div onClick={props.onClick} className={`task ${props.isDragging ? "task--draging" : ""}`}>
			<div className="task__header">
				<h5 className="m-0">{props.name}</h5>
				<img
					className="task__avatar"
					src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"
					alt=""
				/>
			</div>

			<p className={description?.length > 0 ? "task__description" : ""}>
				{description?.length > 150 ? description?.slice(0, 150) + "..." : description}
			</p>
		</div>
	);
};

export default Task;
