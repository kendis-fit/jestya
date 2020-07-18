import { IJwtProjects } from "../jwt-projects/jwt-projects.interface";

export interface IJwtTasks extends IJwtProjects {
    taskIds: string[];
}