export interface IConfig {
	connection: {
		host: string;
		port: string;
		username: string;
		password: string;
		database: string;
	};
	secretKey: string;
}
