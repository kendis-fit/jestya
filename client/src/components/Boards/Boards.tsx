import React, { useState } from "react";

import Board from "../Board";
import resource from "../../api/resource";
import { useVanillaFetch } from "vanilla-hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export interface IBoardList {
	projectId: string;
}

interface IBoardCreator {
	title: string;
	color: string;
}

class BoardCreator {
	id: string;
	title: string;
	color: string;
	icon: string;
	constructor(title: string, color: string, icon: string, num: number) {
		this.title = title;
		this.color = color;
		this.icon = icon;
		this.id = "" + Date.now() * num;
	}
}

const Boards = (props: IBoardList) => {
	const [boardsList, setBoardsList] = useState<any[]>([
		{ ...new BoardCreator("Title 1", "cyan", "thumb_up", 52) },
		{ ...new BoardCreator("Title 2", "orange", "thumb_down", 92) },
		{ ...new BoardCreator("Title 3", "yellow", "today", 22) },
		{ ...new BoardCreator("Title 4", "green", "watch_later", 27) },
		{ ...new BoardCreator("Title 5", "red", "work_outline", 2) },
	]);

	console.log(boardsList);

	const { data: boards, loading, error } = useVanillaFetch(() =>
		resource.projects.findBoards(props.projectId)
	);

	if (loading) {
		return <div>Loading...</div>;
	}

	const handleAddBoard = (index: number) => {
		if (typeof index === "number") {
			setBoardsList([...boardsList.splice(index, 0, 2), ...boardsList]);
		} else {
			setBoardsList([...boardsList, 1]);
		}
	};

	const handleDeleteBoard = (index: number) => {
		setBoardsList([...boardsList.slice(0, index), ...boardsList.slice(index + 1)]);
	};

	const onDragEnd = (result: any) => {
		if (!result.destination) return; // dropped outside the list

		const startIndex = result.source.index;
		const endIndex = result.destination.index;

		const list = [...boardsList.slice(0, startIndex), ...boardsList.slice(startIndex + 1)];
		list.splice(endIndex, 0, boardsList[startIndex]);
		setBoardsList(list);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{(provided, snapshot) => (
					<div className="boards " ref={provided.innerRef} {...provided.droppableProps}>
						{boardsList.map((ell, i) => (
							<Draggable key={ell.id} draggableId={ell.id} index={i}>
								{(provided, snapshot) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<Board
											boardData={ell}
											// key={i}
											index={i}
											handleAddBoard={handleAddBoard}
											handleDeleteBoard={handleDeleteBoard}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						<Board index={boardsList.length} addBoard handleAddBoard={handleAddBoard} />
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Boards;
