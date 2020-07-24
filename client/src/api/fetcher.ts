export const updateHeadersWithToken = (requestInit?: RequestInit | undefined) => {
	const token = localStorage["user"] && JSON.parse(localStorage["user"]).token;

	const options = requestInit;
	if (options && token) {
		options.headers = {
			...options.headers,
			Authorization: `Bearer ${token}`,
		};
	}
	return options;
};

export const fetcher = async (request: RequestInfo, requestInit?: RequestInit | undefined) => {
	return fetch(request, updateHeadersWithToken(requestInit));
};
