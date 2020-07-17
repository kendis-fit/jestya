import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Role } from '../user/user.entity';
import { RequestUserProjects } from "../helpers/request.interface";

@Injectable()
export class RoleProjectsGuard implements CanActivate {
	constructor(private readonly checkFromFaces: Role[]) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUserProjects>();
		const projectId = req.params.id;
		const user = req.user;
		if (!user) {
			return false;
		}
		for (const face of this.checkFromFaces) {
			switch (face) {
				case Role.USER:
					const userContainsProject = user.projectIds.some(id => id === projectId);
					if (userContainsProject) {
						return true;
					}
					break;
				case Role.ADMIN:
				case Role.SUPER_ADMIN:
					const adminContainsProject = user.creatorIds.some(id => id === projectId);
					if (adminContainsProject) {
						return true;
					}
					break;
			}
		}
		return false;
	}
}
