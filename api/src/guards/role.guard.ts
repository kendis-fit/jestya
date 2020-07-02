import { Observable } from "rxjs";
import { ROLE } from "src/user/user.entity";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private readonly role: ROLE) {}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest();
		if (req.user !== this.role) {
			return false;
		}
		return true;
	}
}
