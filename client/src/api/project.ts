const projects = {
	findAll: () => {
		return Promise.resolve([
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
		]);
	},
};

export default projects;
