import { fetcher } from "./fetcher";

//Task
export interface ITask {
	id: string;
	name: string;
	description?: string;
	priority: string;
}

export interface IAddTaskValues {
	task: ITask;
	boardId: string;
}

export interface IDragTaskData {
	dropInBoardId: string;
	dropOutBoardId: string;
	dropTaskId: string;
	dropInPosition: number;
	dropOutPosition: number;
}

export interface IRemoveTaskValues {
	taskId: string;
	boardId: string;
}

// Board
export interface IBoard {
	id: string;
	name: string;
	icon: string;
	color: string;
	description?: string;
	tasks: ITask[];
}

export interface ISavingBoard {
	name?: string;
	description?: string;
	color?: string;
	icon?: string;
	position?: number;
}

export interface IAddBoardResponse {
	id: string;
}

export interface IDragIndexs {
	startIndex: number;
	endIndex: number;
}

const boardProjects = {
	findBoards: (id: string) => {
		return new Promise<IBoard[]>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects/${id}/boards`, {
					method: "GET",
				});
				const body = await req.json();
				if (req.status === 200) {
					resolve(body);
				} else {
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	removeBoard: (id: string, boardId: string) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const req = await fetcher(
					`${process.env.REACT_APP_API}/projects/${id}/boards/${boardId}`,
					{
						method: "DELETE",
					}
				);
				if (req.status === 204) {
					resolve();
				} else {
					const body = await req.json();
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	createBoard: (id: string, board: ISavingBoard) => {
		return new Promise<IAddBoardResponse>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects/${id}/boards`, {
					method: "POST",
					body: JSON.stringify(board),
					headers: {
						"Content-Type": "application/json",
					},
				});
				const body = await req.json();
				if (req.status === 201) {
					resolve(body);
				} else {
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	updateBoard: (id: string, boardId: string, board: ISavingBoard) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const req = await fetcher(
					`${process.env.REACT_APP_API}/projects/${id}/boards/${boardId}`,
					{
						method: "PUT",
						body: JSON.stringify(board),
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (req.status === 204) {
					resolve();
				} else {
					const body = await req.json();
					reject(body);
				}
			} catch {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
};

export default boardProjects;
