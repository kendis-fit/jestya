import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";

import { IJwt } from "./jwt.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("jwt.secretKey"),
		});
	}

	async validate(payload: IJwt, done: VerifiedCallback) {
		if (!payload) {
			return done(new HttpException({ message: "user is unauthorized" }, HttpStatus.UNAUTHORIZED));
		}
		const { iat, ...user } = payload;
		return done(null, user, iat);
	}
}
