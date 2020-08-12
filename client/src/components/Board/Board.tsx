import React, { useState } from "react";

import { IBoard } from "../../api/boardProjects";
import BoardHeaderContainer from "./BoardHeader/BoardHeaderContainer";
import TaskList from "./TaskList";
import { Droppable } from "react-beautiful-dnd";
import TackListContainer from "./TaskList/TackListContainer";
// import Task from "./Task";

export interface IBoardProps extends IBoard {
	isOdd?: boolean;
	providedBoard: any;
	isDragingBoard: boolean;
}

const Board = ({ isOdd, isDragingBoard, ...props }: IBoardProps) => {
	const [taskList, setTaskList] = useState<any[]>([{ id: Date.now() }, { id: Date.now() }]);

	const handleAddTask = () => {
		setTaskList([...taskList, "s"]);
	};


	return (
		<div className={`board ${isOdd ? "board--odd" : ""}`}>
			<BoardHeaderContainer {...props} />
			<Droppable isDropDisabled={isDragingBoard} droppableId={`drag-task`}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="board__tasklist ">
							<TackListContainer
								boardId={props.id}
								providedTask={provided}
								tasks={props.tasks}
							/>
							{/* empty task list */}
							{props.tasks.length === 0 ? (
								<>
									<button className="board__button mt-2" onClick={handleAddTask}>
										<span className="material-icons">add</span>
									</button>
									<div className="no-tasks board__no-tasks ">
										<span className="no-tasks__icon material-icons">
											fact_check
										</span>
										<h5 className="text-center text-muted">No Tasks </h5>
										<p className="text-center text-muted m-0 w-75">
											Add new task by click "+" button or drag task here
										</p>
									</div>
								</>
							) : null}
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Board;
