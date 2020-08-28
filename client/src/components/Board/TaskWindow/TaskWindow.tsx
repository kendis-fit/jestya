import React, { useState } from "react";
import Input from "../../Input";
import Select from "../../Select";
import TextArea from "../../TextArea";
import { Formik } from "formik";
import { ITask, IRemoveTaskValues } from "../../../api/boardProjects";
import { object, string } from "yup";
import { IUpdateTask } from "../../../reducers/boards/interfaces/IUpdateTaskAction";
import { IAddTask } from "../../../reducers/boards/interfaces/IAddTask";
import CommentBlock from "../CommentBlock";

// __________________data______________________________________
const UserList = ["Unassigned", "se", "er"];
const PriorityList = [
	{ value: "", label: "Choose priority..." },
	{ value: "LOWEST", label: "Lowest" },
	{ value: "LOW", label: "Low" },
	{ value: "MEDIUM", label: "Medium" },
	{ value: "HIGH", label: "High" },
	{ value: "HIGHEST", label: "Highest" },
];

const validationSchema = object().shape({
	name: string().max(200, "Too Long!").required("Required"),
	priority: string().required("Required"),
});

const initialValues = {
	id: `f${(+new Date()).toString(16)}`,
	name: "",
	description: "",
	priority: "",
};

// --------------------------------------------------------------

export interface ITaskWindow {
	onClose: any;
	boardId: string;
	addTask: (value: IAddTask) => void;
	removeTask: (value: IRemoveTaskValues) => void;
	updateTask: (value: IUpdateTask) => void;
	task: ITask | null;
}

const TaskWindow = (props: ITaskWindow) => {
	const [readOnly, setReadOnly] = useState(false);
	const { boardId, task } = props;
	const editing = !!task;

	const Values = task ? task : initialValues;

	const handleSubmiting = (task: ITask) => {
		console.log("submit", task);
		if (editing) {
			props.updateTask({ boardId, task });
		} else {
			props.addTask({ task, boardId });
		}
		props.onClose();
	};

	return (
		<div className="task-window bg-white card ">
			<div className="task-window__header">
				<h4>{editing ? "Editing task" : "Creating task"}</h4>
				<div className="">
					<div className="task-window__nav">
						{readOnly || !editing ? null : (
							<>
								<button
									className="task-window__nav-btn task-window__nav-btn--delete"
									onClick={() => {
										props.removeTask({
											boardId: props.boardId,
											taskId: Values.id,
										});
										props.onClose();
									}}
								>
									Delete
								</button>
								<button className="task-window__nav-btn ">
									<span className="material-icons">archive</span>
								</button>
							</>
						)}

						<button className="task-window__nav-btn" onClick={props.onClose}>
							<span className="material-icons">close</span>
						</button>
					</div>
				</div>
			</div>

			<div className="task-window__forms w-95 p-3">
				<div className="task-window__form">
					<Formik
						initialValues={Values}
						validationSchema={validationSchema}
						onSubmit={handleSubmiting}
					>
						{({ handleChange, handleSubmit, errors, touched, values }) => (
							<form onSubmit={handleSubmit}>
								<Input
									className="mb-3 task-window__input"
									name="name"
									autoFocus={editing ? false : true}
									heplerText=""
									placeholder={"Name"}
									value={values.name}
									errors={errors}
									touched={touched}
									readOnly={readOnly}
									onChange={handleChange}
								/>
								<TextArea
									className="mb-3 task-window__descripton"
									name="description"
									cols={30}
									rows={10}
									placeholder="This task doesnt have descripton"
									resize="none"
									value={values.description}
									errors={errors}
									touched={touched}
									readOnly={readOnly}
									onChange={handleChange}
								/>
								<div className="d-flex justify-content-between w-100">
									<Select
										className="mb-4 task-window__select"
										value={"Executor"}
										label="Assign"
										name="executor"
										heplerText="Choose user role"
										onChange={handleChange}
										errors={errors}
										touched={touched}
										disabled={readOnly}
									>
										{UserList.map((ell, i) => (
											<option key={i} value={ell} label={ell} />
										))}
									</Select>
									<Select
										label="Priority"
										name="priority"
										className="mb-4 task-window__select"
										heplerText="Choose priority of task"
										value={values.priority}
										onChange={handleChange}
										errors={errors}
										touched={touched}
										disabled={readOnly}
									>
										{PriorityList.map((ell, i) => (
											<option key={i} value={ell.value} label={ell.label} />
										))}
									</Select>
								</div>
								{readOnly ? null : (
									<button type="submit" className=" task-window__submit">
										{editing ? "Edit" : "Create"}
									</button>
								)}
							</form>
						)}
					</Formik>
				</div>
				<div className="">
					<CommentBlock />
				</div>
			</div>
		</div>
	);
};

export default TaskWindow;
