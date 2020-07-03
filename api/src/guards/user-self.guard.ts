import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ROLE } from "src/user/user.entity";

@Injectable()
export class UserSelfGuard implements CanActivate {
	constructor(private readonly canSuperAdmin?: boolean, private readonly isAdmin?: boolean) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest();
		if (this.canSuperAdmin && req.user.role === ROLE.SuperAdmin) {
			return true;
		}
		if (this.isAdmin && req.user.role !== ROLE.Admin) {
			return false;
		}
		return req.user.id === req.params.id;
	}
}
