import { fetcher } from "./fetcher";

const mockObject = [
	{
		id: "1",
		name: "Front-end",
		description: "mdaa",
		data: [12, 34, 44],
		labels: ["to-do", "in processing", "done"],
	},
	{
		id: "2",
		name: "Back-end",
		data: [12, 34, 44],
		labels: ["to-do", "in processing", "done"],
	},
	{
		id: "3",
		name: "Devops",
		data: [12, 34, 44],
		labels: ["to-do", "in processing", "done"],
	},
];

const projects = {
	findAll: () => {
		return new Promise<any[]>(async (resolve, reject) => {
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
				reject({ message: "An unknown error", status: 500 });
			}
		});
	},
};

export default projects;
