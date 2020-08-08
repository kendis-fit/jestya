import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";
import { DragDropContext, Droppable, } from "react-beautiful-dnd";

import resource from "../../api/resource";
import { IBoard } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";
import Error from "../Error";

export interface IBoards {
    projectId: string;
	initBoards: (board: IBoard[]) => void;
}

const Boards = (props: IBoards) => {
	const { data: boards, loading, error } = useVanillaFetch(() =>
		resource.projects.findBoards(props.projectId)
	);

	useEffect(() => {
		if (boards) {
			props.initBoards(boards);
		}
	}, [boards, props]);

	if (error) {
		return <Error error={error} />
	}

	if (loading) {
		return <div>Loading...</div>;
	}


	return (
		<DragDropContext onDragEnd={() => console.log()}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided) => (
					<div className="boards " ref={provided.innerRef} {...provided.droppableProps}>
				        <ListBoardsContainer boards={[]} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Boards;
