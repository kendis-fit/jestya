import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Role } from "../user/user.entity";
import { RequestUser } from "../helpers/request-user.interface";

@Injectable()
export class UserSelfGuard implements CanActivate {
	constructor(private readonly canSuperAdmin?: boolean, private readonly isAdmin?: boolean) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUser>();
		const user = req.user;
		if (!user) {
			return false;
		}
		if (this.canSuperAdmin && user.role === Role.SUPER_ADMIN) {
			return true;
		}
		if (this.isAdmin && req.user.role !== Role.ADMIN) {
			return false;
		}
		return req.user.id === req.params.id;
	}
}
