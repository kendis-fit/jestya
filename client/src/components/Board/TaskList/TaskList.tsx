import React from "react";
import Task from "../Task";
import { Draggable } from "react-beautiful-dnd";

export interface ITaskList {
	tasks: any[];
	providedTask: any;
}

const TaskList = (props: ITaskList) => {
	const handleOnScroll = (event: React.UIEvent<HTMLElement>) => {
		const el = event.currentTarget;
		el.classList.add("tasklist--scroll");
		setTimeout(() => {
			el.classList.remove("tasklist--scroll");
		}, 1500);
	};
	return (
		<div onScrollCapture={handleOnScroll} className="tasklist">
			{props.tasks.map((ell, index) => (
				<Draggable key={ell.id + index} draggableId={ell.id * index + ""} index={index}>
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
				<button className="board__button mt-2" onClick={() => {}}>
					<span className="material-icons">add</span>
				</button>
			</div>
		</div>
	);
};

export default TaskList;
