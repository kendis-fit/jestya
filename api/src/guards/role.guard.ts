import { Observable } from "rxjs";
import { ExecutionContext, Injectable, ForbiddenException, UnauthorizedException } from "@nestjs/common";

import { JwtGuard } from "./jwt.guard";
import { Role } from "../user/user.entity";

@Injectable()
export class RoleGuard extends JwtGuard {
	constructor(private readonly roles: Role[]) {
		super({});
	}

	public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	public handleRequest(err: any, user: any, info: any) {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		
		if (!this.roles.includes(user.role)) {
			throw new ForbiddenException();
		}
		return user;
	}
}
