import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Board from "../Board";
import { IBoard } from "../../api/boardProjects";

export interface IListBoards {
	boards: IBoard[];
}

const ListBoards = (props: IListBoards) => {
	return (
		<>
			{props.boards.map((board, index) => (
				<Draggable key={board.id} draggableId={board.id} index={index}>
					{provided => (
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<Board isOdd={index % 2 !== 0} {...board} />
						</div>
					)}
				</Draggable>
			))}
		</>
	);
};

export default ListBoards;
