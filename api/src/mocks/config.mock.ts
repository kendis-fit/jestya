export const mockedConfigService = {
	get: (key: string) => {
		switch (key) {
			case "jwt.secretKey":
				return "12345";
		}
	},
};
