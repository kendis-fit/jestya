import { Observable } from "rxjs";
import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";

import { Role } from "../../user/user.entity";
import { RequestUser } from "../../helpers/request.interface";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly roles: Role[]) {}

	public canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUser>();
		const user = req.user;
		if (!user) {
			return false;
		}
		if (this.roles.includes(user.role)) {
			return true;
		}
		return false;
	}
}
