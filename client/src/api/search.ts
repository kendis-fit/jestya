import { fetcher } from "./fetcher";

const search = {
	findUsers: (field: string, value: string) => {
		return new Promise<any>(async (resolve, reject) => {
			try {
				const req = await fetcher(
					`${process.env.REACT_APP_API}/search/users?field=${field}&value=${value}`,
					{
						method: "GET",
					}
				);

				const body = await req.json();
				if (req.status === 200) {
					resolve(body);
				} else {
					reject(body);
				}
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
	findProjects: (field: string, value: string) => {
		return new Promise<any>(async (resolve, reject) => {
			try {
				const req = await fetcher(
					`${process.env.REACT_APP_API}/search/projects?field=${field}&value=${value}`,
					{
						method: "GET",
					}
				);

				const body = await req.json();
				if (req.status === 200) {
					resolve(body);
				} else {
					reject(body);
				}
			} catch (error) {
				reject({ message: "An unknown error", statusCode: 500 });
			}
		});
	},
};

export default search;
