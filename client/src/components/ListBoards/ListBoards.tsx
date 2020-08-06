import React from "react";

import Board from "../Board";
import { IBoard } from "../../api/boardProjects";
import AddBoardContainer from "../AddBoard/AddBoardContainer";

export interface IListBoards {
	boards: IBoard[];
}

const ListBoards = (props: IListBoards) => {
	return (
		<div className="boards">
			{props.boards.map((board, index) => (
				<Board key={index} {...board} />
			))}
			<AddBoardContainer />
		</div>
	);
};

export default ListBoards;
