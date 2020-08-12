import React from "react";
import Task from "../Task";
import { Draggable } from "react-beautiful-dnd";
import { IAddTaskValues, IRemoveTaskValues } from "../../../api/boardProjects";

export interface ITaskList {
	tasks: any[];
	boardId: string;
	providedTask: any;
	addTask: (value: IAddTaskValues) => void;
	removeTask: (value: IRemoveTaskValues) => void;
}

const TaskList = (props: ITaskList) => {
	const handleOnScroll = (event: React.UIEvent<HTMLElement>) => {
		const el = event.currentTarget;
		el.classList.add("tasklist--scroll");
		setTimeout(() => {
			el.classList.remove("tasklist--scroll");
		}, 1500);
	};

	const handleAddTask = () => {
		props.addTask({
			boardId: props.boardId,
			task: {
				id: `f${(+new Date()).toString(16)}`,
				name: "task",
				description: "asdasdasd",
				priority: "1",
			},
		});
	};

	return (
		<div onScrollCapture={handleOnScroll} className="tasklist">
			{props.tasks.map((ell, index) => (
				<Draggable key={ell.id} draggableId={ell.id} index={index}>
					{provided => (
						<div
							className=""
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<Task key={ell} />
						</div>
					)}
				</Draggable>
			))}
			<div className="tasklist__add-btn">
				<button className="board__button mt-2" onClick={handleAddTask}>
					<span className="material-icons">add</span>
				</button>
			</div>
		</div>
	);
};

export default TaskList;
