import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { IJwt } from "../jwt/jwt.interface";
import { IJwtProjects } from "./jwt-projects.interface";
import { ProjectService } from "../../project/project.service";

@Injectable()
export class JwtProjectsStrategy extends PassportStrategy(Strategy, "jwt-projects") {
    constructor(
        private readonly configService: ConfigService,
        private readonly projectService: ProjectService
        ) {
        super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("jwt.secretKey"),
		});
    }

    public async validate(payload: IJwt): Promise<IJwtProjects> {
        const projects = await this.projectService.findAll(payload.id);
        const projectIds = projects.map(project => project.id);
        const creatorIds = projects.map(project => project.creatorId);
        return { ...payload, projectIds, creatorIds };
    }
}