import { Request } from "express";

import { IJwt } from "../strategies/jwt/jwt.interface";
import { IJwtTasks } from "../strategies/jwt-tasks/jwt-tasks.interface";
import { IJwtProjects } from "../strategies/jwt-projects/jwt-projects.interface";

export interface RequestUser extends Request {
    user?: IJwt;
}

export interface RequestUserProjects extends Request {
    user?: IJwtProjects;
}

export interface RequestUserTasks extends Request {
    user?: IJwtTasks;
}