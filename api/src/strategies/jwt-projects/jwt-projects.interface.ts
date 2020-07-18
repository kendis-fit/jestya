import { IJwt } from "../jwt/jwt.interface";

export interface IJwtProjects extends IJwt {
    projects: {
        id: string;
        creatorId: string;
    }[];
}