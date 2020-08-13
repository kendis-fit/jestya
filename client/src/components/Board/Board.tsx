import React from "react";

import { IBoard } from "../../api/boardProjects";
import BoardHeaderContainer from "./BoardHeader/BoardHeaderContainer";
import { Droppable } from "react-beautiful-dnd";
import TackListContainer from "./TaskList/TackListContainer";

export interface IBoardProps extends IBoard {
	isOdd?: boolean;
	providedBoard: any;
	isDragingBoard: boolean;
}

const Board = ({ isOdd, isDragingBoard, ...props }: IBoardProps) => {
	return (
		<div className={`board ${isOdd ? "board--odd" : ""}`}>
			<BoardHeaderContainer {...props} />
			<Droppable isDropDisabled={isDragingBoard} droppableId={`drag-task_${props.id}`}>
				{provided => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						<div className="board__tasklist ">
							<TackListContainer
								boardId={props.id}
								providedTask={provided}
								tasks={props.tasks}
							/>
						</div>
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Board;
