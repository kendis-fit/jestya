import { Observable } from "rxjs";
import { Role } from "../user/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { RequestUser } from "src/helpers/request-user.interface";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly roles: Role[]) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUser>();
		const user = req.user;
		if (user) {
			return this.roles.includes(req.user.role);
		}
		return false;
	}
}
