const projects = {
	findAll: () => {
		return Promise.resolve([
			{
				name: "Front-end",
				data: [12, 34, 44],
				labels: ["to-do", "in processing", "done"],
			},
			{
				name: "Back-end",
				data: [12, 34, 44],
				labels: ["to-do", "in processing", "done"],
			},
			{
				name: "Devops",
				data: [12, 34, 44],
				labels: ["to-do", "in processing", "done"],
			},
		]);
	},
};

export default projects;
