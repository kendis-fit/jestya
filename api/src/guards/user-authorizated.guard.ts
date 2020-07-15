import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestUser } from 'src/helpers/request-user.interface';

@Injectable()
export class UserAuthorizatedGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const ctx = context.switchToHttp();
		const req = ctx.getRequest<RequestUser>();
		const user = req.user;
		if (user || req.url === "/users/login" || req.url === "/users/registration") {
			return true;
		}
		return false;
	}
}
