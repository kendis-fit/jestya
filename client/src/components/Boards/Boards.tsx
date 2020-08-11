import React, { useEffect, useState } from "react";
import { useVanillaFetch } from "vanilla-hooks";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import resource from "../../api/resource";
import { IBoard, IDragIndexs } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";
import Error from "../Error";

export interface IBoards {
	projectId: string;
	initBoards: (board: IBoard[]) => void;
	dragBoard: (result: IDragIndexs) => void;
}

const Boards = (props: IBoards) => {
	const { data: boards, loading, error } = useVanillaFetch(() =>
		resource.projects.findBoards(props.projectId)
	);

	const [isDragingBoard, setIsDragingBoard] = useState(false);
	const [isDragingTask, setIsDragingTask] = useState(false);

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

	const handleOnDragEnd = (result: any) => {
		setIsDragingBoard(false); //reset drag status
		setIsDragingTask(false); //reset drag status
		if (!result.destination) return; // dropped outside the list
		const dragIndexs = {
			startIndex: result.source.index,
			endIndex: result.destination.index,
		};
		props.dragBoard(dragIndexs);
	};

	const handleOnDragStart = (dragItem: any) => {
		if (dragItem.source.droppableId === "drag-board") {
			setIsDragingBoard(true);
		} else {
			setIsDragingTask(true);
		}
	};
	return (
		<DragDropContext onDragStart={handleOnDragStart} onDragEnd={handleOnDragEnd}>
			<Droppable
				isDropDisabled={isDragingTask}
				droppableId="drag-board"
				direction="horizontal"
			>
				{provided => (
					<div className="boards" ref={provided.innerRef} {...provided.droppableProps}>
						<ListBoardsContainer
							isDragingBoard={isDragingBoard}
							dragPlaceholder={provided.placeholder}
							boards={[]}
						/>
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Boards;
