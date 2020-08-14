import React from "react";
import Input from "../../Input";
import Select from "../../Select";

const UserList = ["se", "se", "er"];

const TaskWindow = () => {
	return (
		<div className="task-window p-3   bg-white card  ">
			<div className="task-window__nav border-bottom-0  border-secondary"></div>
			<div className="w-55">
				<Input name="title" label="Title" heplerText="" placeholder={"Title"} />
				<textarea
					className=" form-control text-muted bg-white "
					cols={30}
					rows={10}
					defaultValue="sdfsf"
				/>
				<Select
					value={"Executor"}
					label="executorIds"
					name="role"
					className="mb-4"
					heplerText="Choose user role"
				>
					{UserList.map((ell, i) => (
						<option key={i} value={ell} label={ell} />
					))}
				</Select>
				<Select
					value={"s"}
					label="Priority"
					name="priority"
					className="mb-4"
					heplerText="Choose user role"
				>
					{UserList.map((ell, i) => (
						<option key={i} value={ell} label={ell} />
					))}
				</Select>

				<Input name="title" label="Title" heplerText="" />
			</div>
		</div>
	);
};

export default TaskWindow;
