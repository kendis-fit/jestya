import React from "react";
import Input from "../../Input";

const TaskWindow = () => {
	return (
		<div className="task-window p-3   bg-white card ">
			<div className="w-55">
				<Input name="title" label="Title"  heplerText="" />
				<Input name="title" label="Title" heplerText="" />
				<Input name="title" label="Title" heplerText="" />

			</div>
		</div>
	);
};

export default TaskWindow;
