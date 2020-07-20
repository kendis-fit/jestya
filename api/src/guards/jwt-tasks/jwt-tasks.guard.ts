import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { JWT_TASKS } from "../../strategies/jwt-tasks/jwt-tasks.strategy";

@Injectable()
export class JwtTasksGuard extends AuthGuard(JWT_TASKS) {}
