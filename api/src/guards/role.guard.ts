import { Observable } from "rxjs";
import { Role } from "src/user/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly roles: Role[]) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest();
		return this.roles.includes(req.user.role);
	}
}
