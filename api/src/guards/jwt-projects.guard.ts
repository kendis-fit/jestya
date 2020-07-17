import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtProjectsGuard extends AuthGuard("jwt-projects") {}
