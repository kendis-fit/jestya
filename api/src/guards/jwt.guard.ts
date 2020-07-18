import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { JWT } from '../strategies/jwt/jwt.strategy';

@Injectable()
export class JwtGuard extends AuthGuard(JWT) {}
