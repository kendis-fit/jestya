import { Observable } from "rxjs";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { Role } from "../user/user.entity";
import { RequestUser } from "../helpers/request-user.interface";

@Injectable()
export class UserSelfGuard implements CanActivate {
	constructor(private readonly roles: Role[]) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUser>();
		const user = req.user;
		if (!user || (this.roles.length > 0 && !this.roles.includes(user.role))) {
			return false;
		}
		return req.user.id === req.params.id;
	}
}
