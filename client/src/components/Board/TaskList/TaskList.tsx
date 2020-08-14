import React, { useState } from "react";
import Task from "../Task";
import { Draggable } from "react-beautiful-dnd";
import { IAddTaskValues, IRemoveTaskValues } from "../../../api/boardProjects";
import CircleAddBtn from "../../CircleAddBtn";
import ModalContainer from "../../ModalContainer";
import TaskWindow from "../TaskWindow";

export interface ITaskList {
	tasks: any[];
	boardId: string;
	providedTask: any;
	addTask: (value: IAddTaskValues) => void;
	removeTask: (value: IRemoveTaskValues) => void;
}

const TaskList = (props: ITaskList) => {
	const [showTaskModal, setShowTaskModal] = useState(!false);
	const handleOnScroll = (event: React.UIEvent<HTMLElement>) => {
		const el = event.currentTarget;
		el.classList.add("tasklist--scroll");
		setTimeout(() => {
			el.classList.remove("tasklist--scroll");
		}, 1500);
	};

	const handleAddTask = () => {
		// props.addTask({
		// 	boardId: props.boardId,
		// 	task: {
		// 		id: `f${(+new Date()).toString(16)}`,
		// 		name: "task",
		// 		description: "asdasdasd",
		// 		priority: "1",
		// 	},
		// });
		setShowTaskModal(true);
	};

	return (
		<div onScrollCapture={handleOnScroll} className="tasklist">
			{props.tasks.length === 0 ? (
				<>
					<CircleAddBtn className="mt-2" onClick={handleAddTask} />
					<div className="no-tasks tasklist__no-tasks ">
						<span className="no-tasks__icon material-icons">fact_check</span>
						<h5 className="text-center text-muted">No Tasks </h5>
						<p className="text-center text-muted m-0 w-75">
							Add new task by click "+" button or drag task here
						</p>
					</div>
				</>
			) : (
				<>
					{props.tasks.map((ell, index) => (
						<Draggable key={ell.id} draggableId={ell.id} index={index}>
							{(provided, snashot) => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<Task key={ell} task={ell} isDragging={snashot.isDragging} />
								</div>
							)}
						</Draggable>
					))}
					<div className="tasklist__add-btn">
						<CircleAddBtn className="mt-2" onClick={handleAddTask} />
					</div>
				</>
			)}
			{showTaskModal ? (
				<ModalContainer backdrop isOpen={true} onClose={() => setShowTaskModal(false)}>
					{/* <h2 className="text-white">sdf</h2> */}
					<TaskWindow />
				</ModalContainer>
			) : null}
		</div>
	);
};

export default TaskList;
