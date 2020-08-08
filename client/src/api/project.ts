import { fetcher } from "./fetcher";
import boardProjects from "./boardProjects";

const mockObject = [
	{
		id: "1",
		name: "Front-end",
		description: "mdaa",
		boards: [
			{
				name: "to-do",
				countTasks: 12,
			},
			{
				name: "in processing",
				countTasks: 34,
			},
			{
				name: "done",
				countTasks: 44,
			},
		],
	},
	{
		id: "2",
		name: "Back-end",
		boards: [
			{
				name: "to-do",
				countTasks: 22,
			},
			{
				name: "in processing",
				countTasks: 10,
			},
			{
				name: "done",
				countTasks: 67,
			},
		],
	},
	{
		id: "3",
		name: "Devops",
		boards: [
			{
				name: "to-do",
				countTasks: 2,
			},
			{
				name: "in processing",
				countTasks: 54,
			},
			{
				name: "done",
				countTasks: 3,
			},
		],
	},
];

export interface IBoard {
	name: string;
	countTasks: number;
}

export interface IProject {
	id: string;
	name: string;
	description?: string;
	boards: IBoard[];
}

export interface IAddProject {
	name: string;
	description?: string;
}

export interface IAddProjectResponse {
	id: string;
	boards: IBoard[];
}

const projects = {
	...boardProjects,
	findAll: () => {
		return new Promise<IProject[]>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects`, {
					method: "GET",
				});

				const body = await req.json();
				if (req.status === 200) {
					resolve([...body, ...mockObject]);
				} else {
					reject(body);
				}
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	create: (project: IAddProject) => {
		return new Promise<IAddProjectResponse>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects`, {
					method: "POST",
					body: JSON.stringify(project),
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
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	archive: (id: string, isArchive: boolean = true) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects/${id}`, {
					method: "PATCH",
					body: JSON.stringify({ isArchive }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (req.status === 204) {
					resolve();
				} else {
					const body = await req.json();
					reject(body);
				}
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
};

export default projects;
