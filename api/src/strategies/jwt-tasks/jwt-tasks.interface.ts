import { IJwt } from "../jwt/jwt.interface";

export interface IJwtTasks extends IJwt {
    taskIds: string[];
}