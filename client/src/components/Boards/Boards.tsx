import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useVanillaFetch } from "vanilla-hooks";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import Error from "../Error";
import resource from "../../api/resource";
import { IBoard } from "../../api/boardProjects";
import { IDragIndexs } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";

export interface IBoards {
	projectId: string;
	initBoards: (board: IBoard[]) => void;
	dragBoard: (result: IDragIndexs) => void;
}

const Boards = (props: IBoards) => {
	const { projectId } = useParams();

	const { data: boards, loading, error } = useVanillaFetch(() =>
		resource.projects.findBoards(props.projectId)
	);

	useEffect(() => {
		if (boards) {
			props.initBoards(boards);
		}
	}, [boards, props]);

	if (error) {
		return <Error error={error} />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	const onDragEnd = async (result: DropResult) => {
		if (!result.destination) return;
		const dragIndexs = {
			startIndex: result.source.index,
			endIndex: result.destination.index,
		};
		// await resource.projects.updateBoard(projectId, result.draggableId, { position: result.destination.index });
		props.dragBoard(dragIndexs);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{provided => (
					<div className="boards " ref={provided.innerRef} {...provided.droppableProps}>
						<ListBoardsContainer dragPlaceholder={provided.placeholder} boards={[]} />
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Boards;
