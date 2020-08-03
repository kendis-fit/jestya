import { fetcher } from "./fetcher";

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

const projects = {
	findAll: () => {
		return new Promise<IProject[]>(async (resolve, reject) => {
			try {
				const req = await fetcher(`${process.env.REACT_APP_API}/projects`, {
					method: "GET",
				});

				const body = await req.json();
				if (req.status === 200) {
					resolve(mockObject);
				} else {
					reject(body);
				}
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
};

export default projects;
