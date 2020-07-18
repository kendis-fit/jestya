import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";

import { IJwt } from "../jwt/jwt.interface";
import { IJwtTasks } from "./jwt-tasks.interface";
import { TaskService } from "src/task/task.service";

@Injectable()
export class JwtTasksStrategy extends PassportStrategy(Strategy, "jwt-tasks") {
    constructor(
        configService: ConfigService,
        private readonly taskService: TaskService
        ) {
        super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("jwt.secretKey"),
		});
    }

    public async validate(payload: IJwt): Promise<IJwtTasks> {
		const foundTasks = await this.taskService.findAll(payload.id);
		const taskIds = foundTasks.map(task => task.id);
        return { ...payload, taskIds };
    }
}