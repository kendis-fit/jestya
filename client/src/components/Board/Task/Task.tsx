import React from "react";

const Task = (props: any) => {
	return (
		<div className={`task ${props.isDragging ? "task--draging" : ""}`}>
			<div className="task__header">
				<h5 className="m-0">{props.task.name + props.task.id}</h5>
				<img
					className="task__avatar"
					src="https://upload.wikimedia.org/wikipedia/commons/f/f5/Poster-sized_portrait_of_Barack_Obama.jpg"
					alt=""
				/>
			</div>
		</div>
	);
};

export default Task;
