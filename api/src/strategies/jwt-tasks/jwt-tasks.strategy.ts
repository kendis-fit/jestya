import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { IJwt } from "../jwt/jwt.interface";
import { IJwtTasks } from "./jwt-tasks.interface";
import { TaskService } from "../../task/task.service";
import { ProjectService } from "../../project/project.service";

export const JWT_TASKS = "jwt-tasks";

@Injectable()
export class JwtTasksStrategy extends PassportStrategy(Strategy, JWT_TASKS) {
	constructor(
		configService: ConfigService,
		private readonly projectService: ProjectService,
		private readonly taskService: TaskService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("jwt.secretKey"),
		});
	}

	public async validate(payload: IJwt): Promise<IJwtTasks> {
		const foundTasks = await this.taskService.findAll(payload.id);
		const [foundProjects] = await this.projectService.findAll(payload.id);

		const tasks = foundTasks.map(task => ({
			id: task.id,
			userIds: task.userIds,
		}));
		const projects = foundProjects.map(project => ({
			id: project.id,
			creatorId: project.creatorId,
		}));

		return { ...payload, tasks, projects };
	}
}
