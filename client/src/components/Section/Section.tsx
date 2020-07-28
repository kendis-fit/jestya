import React, { useState } from "react";
import Task from "./Task";

const Colors = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"];

const Section = (props: any) => {
	const [taskList, setTaskList] = useState<any[]>([]);

	const hendleAddTask = () => {
		setTaskList([...taskList, "s"]);
	};

	return (
		<div className="section" style={{ background: props.index % 2 === 0 ? "#fafafa" : "#f2f2f2" }}>
			<div
				className={`section__header p-2 mb-3 d-flex ${
					props.addSection ? "bg-secondary" : Colors[props.index]
				} `}
			>
				{props.addSection ? (
					<button className="btn text-white p-0 d-flex align-items-center" onClick={props.hendleAddSection}>
						<span className="material-icons p-2 mr-2">add_circle_outline</span> Add Section
					</button>
				) : (
					<>
						<span className="material-icons text-white p-2 mr-2">build</span>
						<input className="form-control w-75 " type="text" value={"asdasd"} />{" "}
					</>
				)}
			</div>
			<div className="section__tasklist">
				{props.addSection ? (
					<p className="text-center">Add new section</p>
				) : (
					<>
						{taskList.map((ell, i) => (
							<Task key={i} />
						))}
						<button
							className="
							section__button
							text-primary
							rounded-circle
							btn 
							bg-white
							shadow "
							onClick={hendleAddTask}
						>
							<span className="material-icons">add_circle_outline</span>
						</button>
						{taskList.length === 0 ? (
							<div className="section__noTasks">
								<span className="noTasks__icon text-secondary  material-icons">fact_check</span>
								<h5 className="text-center text-muted">No Tasks </h5>
								<p className="text-center text-muted m-0 w-75">
									Add new task by click "+" button or drag task here
								</p>
							</div>
						) : null}
					</>
				)}
			</div>
		</div>
	);
};

export default Section;
