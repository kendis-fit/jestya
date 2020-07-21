import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { JWT_PROJECTS } from "../../strategies/jwt-projects/jwt-projects.strategy";

@Injectable()
export class JwtProjectsGuard extends AuthGuard(JWT_PROJECTS) {}
