import React, { useState } from "react";
import Task from "./Task";

import BoardHeader from "./BoardHeader";

import { IBoard } from "../../api/boardProjects";

const Board = (props: any) => {
	const [taskList, setTaskList] = useState<any[]>([]);

	const handleAddTask = () => {
		setTaskList([...taskList, "s"]);
	};

	return (
		<div
			className="board"
			style={{ background: props.index % 2 === 0 ? "#fafafa" : "#f2f2f2" }}
		>
			<BoardHeader {...props} />
			<div className="board__tasklist">
				{props.addSection ? (
					<p className="section__addSection-text text-center text-muted">
						Add new section
					</p>
				) : (
					<>
						{taskList.map((ell, i) => (
							<Task key={i} />
						))}
						<button
							className="
							board__button
							text-primary
							rounded-circle
							btn 
							bg-white
							shadow "
							onClick={handleAddTask}
						>
							<span className="material-icons">add</span>
						</button>
						{taskList.length === 0 ? (
							<div className="board__noTasks">
								<span className="noTasks__icon text-secondary  material-icons">
									fact_check
								</span>
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

export default Board;
