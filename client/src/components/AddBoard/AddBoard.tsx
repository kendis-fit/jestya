import React from "react";

import { IBoard } from "../../api/boardProjects";

export interface IAddBoard {
	isOdd?: boolean;
	addBoard: (board: IBoard) => void;
}

const AddBoard = (props: IAddBoard) => {
	return (
		<div className={`board ${props.isOdd ? "board--odd" : ""}`}>
			<div className="board__header p-2 mb-3 border-bottom">
				<button
					className="btn text-info p-0 d-flex align-items-center"
					onClick={() =>
						props.addBoard({
							name: "",
							tasks: [],
							id: Date.now().toString(),
							icon: "add_alert",
							color: "indigo",
						})
					}
				>
					<span className="material-icons p-2 mr-2">add</span> Add board
				</button>
			</div>
			<div className="board__tasklist">
				<p className="board__addSection-text text-center text-muted">Add new board</p>
			</div>
		</div>
	);
};

export default AddBoard;
