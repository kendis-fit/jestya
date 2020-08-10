import React from "react";
import { Draggable } from "react-beautiful-dnd";

import Board from "../Board";
import { IBoard } from "../../api/boardProjects";
import AddBoardContainer from "../AddBoard/AddBoardContainer";

export interface IListBoards {
	boards: IBoard[];
	dragPlaceholder: any;
}

const ListBoards = (props: IListBoards) => {
	return (
		<>
			{props.boards.map((board, index) => (
				<Draggable key={board.id} draggableId={board.id} index={index}>
					{provided => (
						<div ref={provided.innerRef} {...provided.draggableProps}>
							<Board provided={provided} isOdd={index % 2 !== 0} {...board} />
						</div>
					)}
				</Draggable>
			))}
			{props.dragPlaceholder}
			<AddBoardContainer isOdd={props.boards.length % 2 !== 0} />
		</>
	);
};

export default ListBoards;
