import { fetcher } from "./fetcher";

export interface ITask {
	id: string;
	name: string;
	description?: string;
	priority: string;
}

export interface IBoard {
	id: string;
	name: string;
	description?: string;
	tasks: ITask[];
}

export interface IAddBoard {
	name: string;
	description?: string;
}

export interface IAddBoardResponse {
	id: string;
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
};

export default boardProjects;
