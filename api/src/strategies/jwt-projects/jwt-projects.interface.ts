import { IJwt } from "../jwt/jwt.interface";

export interface IJwtProjects extends IJwt {
    projectIds: string[];
    creatorIds: string[];
}