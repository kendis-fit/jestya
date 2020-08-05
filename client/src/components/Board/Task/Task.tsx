import React from "react";

const Task = (props: any) => {
	return (
		<div
			className="
                board__task
                mb-2
				p-3
				shadow-sm
				card
				"
		>
			<div
				className="
				task__header
				m-0
				d-flex
				justify-content-between
				align-items-center
				 "
			>
				<h5 className="m-0">Black Lives Matter)))</h5>
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
