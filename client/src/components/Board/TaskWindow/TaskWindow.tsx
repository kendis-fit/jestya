import React from "react";
import Input from "../../Input";
import Select from "../../Select";
import TextArea from "../../TextArea";
import { Formik } from "formik";
import { ITask, IRemoveTaskValues, IAddTaskValues } from "../../../api/boardProjects";
import { object, string } from "yup";

const UserList = ["Unassigned", "se", "er"];
const PriorityList = [
	{ value: "", label: "Choose priority..." },
	{ value: "LOWEST", label: "Lowest" },
	{ value: "LOW", label: "Low" },
	{ value: "MEDIUM", label: "Medium" },
	{ value: "HIGH", label: "High" },
	{ value: "HIGHEST", label: "Highest" },
];

export interface ITaskWindow {
	onClose: any;
	boardId: string;
	addTask: (value: IAddTaskValues) => void;
	removeTask: (value: IRemoveTaskValues) => void;
}

const validationSchema = object().shape({
	name: string().max(200, "Too Long!").required("Required"),
	description: string().max(50, "Too Long!"),
	priority: string().required("Required"),
});

const TaskWindow = (props: ITaskWindow) => {
	const handleSubmiting = (task: ITask) => {
		console.log("submit", task);
		props.addTask({ task, boardId: props.boardId });
		props.onClose();
	};

	const initialValues = {
		id: `f${(+new Date()).toString(16)}`,
		name: "",
		description: "",
		priority: "",
	};

	return (
		<div className="task-window bg-white card ">
			<div className="task-window__header">
				<h4>Creating task</h4>

				<div className="">
					<div className="task-window__nav">
						<button
							className="task-window__nav-btn task-window__nav-btn--delete"
							onClick={() => {
								props.removeTask({
									boardId: props.boardId,
									taskId: initialValues.id,
								});
								props.onClose();
							}}
						>
							Delete
						</button>
						<button className="task-window__nav-btn ">
							<span className="material-icons">archive</span>
						</button>
						<button className="task-window__nav-btn" onClick={props.onClose}>
							<span className="material-icons">close</span>
						</button>
					</div>
				</div>
			</div>
			<div className="w-90 p-3">
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmiting}
				>
					{({ handleChange, handleSubmit, errors, touched, values }) => (
						<form onSubmit={handleSubmit}>
							<Input
								name="name"
								label="Task"
								heplerText=""
								placeholder={"Title"}
								className="mb-3"
								value={values.name}
								errors={errors}
								touched={touched}
								onChange={handleChange}
							/>
							<TextArea
								name="description"
								className="mb-3"
								cols={30}
								rows={10}
								placeholder="This task doesnt have descripton"
								resize="none"
								label="Description"
								value={values.description}
								errors={errors}
								touched={touched}
								onChange={handleChange}
							/>
							<div className="d-flex justify-content-between w-100">
								<Select
									value={"Executor"}
									label="Assign"
									name="executor"
									className="mb-4 w-45"
									heplerText="Choose user role"
									onChange={handleChange}
									errors={errors}
									touched={touched}
								>
									{UserList.map((ell, i) => (
										<option key={i} value={ell} label={ell} />
									))}
								</Select>
								<Select
									label="Priority"
									name="priority"
									className="mb-4 w-45"
									heplerText="Choose priority of task"
									value={values.priority}
									onChange={handleChange}
									errors={errors}
									touched={touched}
								>
									{PriorityList.map((ell, i) => (
										<option key={i} value={ell.value} label={ell.label} />
									))}
								</Select>
							</div>
							<button type="submit" className="btn bg-blue">
								Create
							</button>
						</form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default TaskWindow;
