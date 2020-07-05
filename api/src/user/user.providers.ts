import { User } from "./user.entity";

export const USER_REPOSITORY = "USER_REPOSITORY";

export const userProviders = [
	{
		provide: USER_REPOSITORY,
		useValue: User,
	},
];
