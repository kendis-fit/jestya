import React, { useState } from "react";
import Task from "../Task";
import { Draggable } from "react-beautiful-dnd";
import { IRemoveTaskValues, ITask } from "../../../api/boardProjects";
import CircleAddBtn from "../../CircleAddBtn";
import ModalContainer from "../../ModalContainer";
import TaskWindowContainer from "../TaskWindow/TaskWindowContainer";
import { IAddTask } from "../../../reducers/boards/interfaces/IAddTask";

export interface ITaskList {
	tasks: any[];
	boardId: string;
	providedTask: any;
	addTask: (value: IAddTask) => void;
	removeTask: (value: IRemoveTaskValues) => void;
}

const TaskList = (props: ITaskList) => {
	const [showTaskModal, setShowTaskModal] = useState(false);
	const [activeTask, setActiveTask] = useState<ITask | null>(null);

	const handleOnScroll = (event: React.UIEvent<HTMLElement>) => {
		const el = event.currentTarget;
		el.classList.add("tasklist--scroll");
		setTimeout(() => {
			el.classList.remove("tasklist--scroll");
		}, 1500);
	};

	const handleAddTask = () => {
		setShowTaskModal(true);
	};

	const handleOpenTask = (task: ITask) => {
		setActiveTask(task);
		setShowTaskModal(true);
	};

	const handleOnClose = () => {
		setShowTaskModal(false);
		setActiveTask(null);
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
									className="tasklist__drag-wrapper"
								>
									<Task
										onClick={() => handleOpenTask(ell)}
										key={ell.id}
										{...ell}
										isDragging={snashot.isDragging}
									/>
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
				<ModalContainer backdrop="secondary" isOpen onClose={handleOnClose}>
					<TaskWindowContainer
						task={activeTask}
						boardId={props.boardId}
						onClose={handleOnClose}
					/>
				</ModalContainer>
			) : null}
		</div>
	);
};

export default TaskList;
