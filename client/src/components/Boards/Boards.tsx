import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import resource from "../../api/resource";
import { IBoard, IDragIndexs } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";
import Error from "../Error";
import AddBoardContainer from "../AddBoard/AddBoardContainer";

export interface IBoards {
	projectId: string;
	initBoards: (board: IBoard[]) => void;
	dragBoard: (result: IDragIndexs) => void;
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
		return <Error error={error} />;
	}

	if (loading) {
		return <div>Loading...</div>;
	}

	const onDragEnd = (result: any) => {
		if (!result.destination) return; // dropped outside the list
		const dragIndexs = {
			startIndex: result.source.index,
			endIndex: result.destination.index,
		};
		props.dragBoard(dragIndexs);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{provided => (
					<div className="boards " ref={provided.innerRef} {...provided.droppableProps}>
						<ListBoardsContainer boards={[]} />
						{provided.placeholder}
						<AddBoardContainer isOdd={boards.length % 2 !== 0} />
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Boards;
