import React, { useState } from "react";

import Board from "../Board";
import { IBoard } from "../../api/boardProjects";

export interface IListBoards {
	boards: IBoard[];
}

const ListBoards = (props: IListBoards) => {
	const [sectionsList, setBoardsList] = useState<any[]>([1, 2, 2, 4, 5, 5, 6, 6, 6, 6, 2]);

	const handleAddBoard = (index: number) => {
		if (typeof index === "number") {
			setBoardsList([...sectionsList.splice(index, 0, 2), ...sectionsList]);
		} else {
			setBoardsList([...sectionsList, 1]);
		}
	};

	const handleDeleteBoard = (index: number) => {
		setBoardsList([...sectionsList.splice(0, index), ...sectionsList.splice(index)]);
	};

	return (
		<div className="boards ">
			{sectionsList.map((ell, i) => (
				<Board key={i} index={i} handleAddBoard={handleAddBoard} handleDeleteBoard={handleDeleteBoard} />
			))}
			<Board index={sectionsList.length} addBoard handleAddBoard={handleAddBoard} />
		</div>
	);
};

export default ListBoards;
