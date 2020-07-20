import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Role } from "../../user/user.entity";
import { RequestUserTasks } from "../../helpers/request.interface";

@Injectable()
export class RoleTasksGuard implements CanActivate {
	constructor(private readonly allowedAdmin?: boolean, private readonly allowedExecutors?: boolean) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUserTasks>();
		const user = req.user;
		const projectId = req.params.id;
		const taskId = req.params.taskId;
		if (!user) {
			return false;
		}
		if (this.allowedAdmin && (user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN)) {
			return user.projects.some(project => project.id === projectId);
		}
		if (this.allowedExecutors) {
			return user.tasks.some(task => task.userIds.some(id => id === user.id));
		}
		return user.tasks.some(task => task.id === taskId);
	}
}
