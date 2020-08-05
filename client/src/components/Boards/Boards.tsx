import React, { useState } from "react";

import Board from "../Board";

export interface IBoardList {
	projectId: string;
}

const BoardList = (props: IBoardList) => {
	const [sectionsList, setBoardsList] = useState<any[]>([1, 2, 2, 4, 5, 5, 6, 6, 6, 6, 2]);

	const handleAddBoard = (index: number) => {
		if (typeof index === "number") {
			setBoardsList([...sectionsList.splice(index, 0, 2), ...sectionsList]);
		} else {
			setBoardsList([...sectionsList, 1]);
		}
	};

	return (
		<div className="boards ">
			{sectionsList.map((ell, i) => (
				<Board key={i} index={i} handleAddBoard={handleAddBoard} />
			))}
			<Board index={sectionsList.length} addBoard handleAddBoard={handleAddBoard} />
		</div>
	);
};

export default BoardList;
