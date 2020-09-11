import { fetcher } from "./fetcher";

const userProjects = {
	addUser: (id: string, userId: string) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				const req = await fetcher(
					`${process.env.REACT_APP_API}/projects/${id}/users/${userId}`,
					{
						method: "POST",
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

export default userProjects;
