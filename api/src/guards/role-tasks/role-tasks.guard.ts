import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '../../user/user.entity';
import { RequestUserTasks } from '../../helpers/request.interface';

@Injectable()
export class RoleTasksGuard implements CanActivate {
	constructor(private readonly allowedAdmin?: boolean) {}
	
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
			return user.creatorIds.some(id => id === projectId);
		}
		return user.taskIds.some(id => id === taskId);
	}
}
