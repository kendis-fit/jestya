import { useParams } from "react-router-dom";
import { useVanillaFetch } from "vanilla-hooks";
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Error from "../Error";
import resource from "../../api/resource";
import { IBoard, IDragTaskData } from "../../api/boardProjects";
import { IDragIndexs } from "../../api/boardProjects";
import ListBoardsContainer from "../ListBoards/ListBoardsContainer";

export interface IBoards {
	projectId: string;
	initBoards: (board: IBoard[]) => void;
	dragBoard: (result: IDragIndexs) => void;
	dragTask: (result: IDragTaskData) => void;
}

const Boards = (props: IBoards) => {
	const { projectId } = useParams();

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

	const handleOnDragEnd = async (result: any) => {
		setIsDragingBoard(false); //reset drag status
		setIsDragingTask(false); //reset drag status

		if (!result.destination) return; // dropped outside the list
		// console.log("result", result);
		// console.log(result.source.droppableId.match(/drag-board:\w+/));
		// console.log(/drag-board\w+/.test(result.source.droppableId));

		if (result.source.droppableId === "drag-board") {
			const dragIndexs = {
				startIndex: result.source.index,
				endIndex: result.destination.index,
			};
			props.dragBoard(dragIndexs);
			await resource.projects.updateBoard(projectId, result.draggableId, {
				position: result.destination.index,
			});
		} else {
			console.log("TASKSSS");
			// console.log(result);
			// console.log(result.source.droppableId.match(/[^_]*$/g)[0]);
			// console.groupEnd();
			props.dragTask({
				dropInBoardId: result.destination.droppableId.match(/[^_]*$/g)[0],
				dropOutBoardId: result.source.droppableId.match(/[^_]*$/g)[0],
				dropInPosition: result.destination.index,
				dropOutPosition: result.source.index,
				dropTaskId: result.draggableId,
			});
			// console.log(a);
		}
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
