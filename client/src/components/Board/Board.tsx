import React, { useState } from "react";

import Task from "./Task";
import { IBoard } from "../../api/boardProjects";
import BoardHeaderContainer from "./BoardHeader/BoardHeaderContainer";

export interface IBoardProps extends IBoard {
	isOdd?: boolean;
	provided: any;
}

const Board = ({ isOdd, ...props }: IBoardProps) => {
	const [taskList, setTaskList] = useState<any[]>([]);

	const handleAddTask = () => {
		setTaskList([...taskList, "s"]);
	};

	return (
		<div className={`board ${isOdd ? "board--odd" : ""}`}>
			<BoardHeaderContainer {...props} />
			<div className="board__tasklist">
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
						shadow"
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
			</div>
		</div>
	);
};

export default Board;
