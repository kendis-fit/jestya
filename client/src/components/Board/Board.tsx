import React, { useState } from "react";

import Task from "./Task";
import { IBoard } from "../../api/boardProjects";
import BoardHeaderContainer from "./BoardHeader/BoardHeaderContainer";

export interface IBoardProps extends IBoard {
	isOdd?: boolean;
	provided: any;
}

const Board = ({ isOdd, ...props }: IBoardProps) => {
	const [taskList, setTaskList] = useState<any[]>([1, 11, 1, 1, 1, 1, 1, 11]);

	const handleAddTask = () => {
		setTaskList([...taskList, "s"]);
	};

	const handleOnScroll = (event: React.UIEvent<HTMLElement>) => {
		const el = event.currentTarget;
		el.classList.add("tasklist--scroll");
		// console.log(event.currentTarget.classList);
		setTimeout(() => {
			el.classList.remove("tasklist--scroll");
			// console.log(el.classList.remove);
		}, 1000);
	};

	return (
		<div className={`board ${isOdd ? "board--odd" : ""}`}>
			<BoardHeaderContainer {...props} />
			<div onScrollCapture={handleOnScroll} className="board__tasklist tasklist">
				{taskList.map((ell, i) => (
					<Task key={i} />
				))}
				<button
					className="
						board__button
						"
					onClick={handleAddTask}
				>
					<span className="material-icons">add</span>
				</button>
			</div>
			{taskList.length === 0 ? (
				<div className="no-tasks board__no-tasks ">
					<span className="no-tasks__icon text-secondary  material-icons">
						fact_check
					</span>
					<h5 className="text-center text-muted">No Tasks </h5>
					<p className="text-center text-muted m-0 w-75">
						Add new task by click "+" button or drag task here
					</p>
				</div>
			) : null}
		</div>
	);
};

export default Board;
