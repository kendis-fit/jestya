import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { IJwt } from "./jwt.interface";

export const JWT = "jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT) {
	constructor(configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>("jwt.secretKey"),
		});
	}

	public async validate(payload: IJwt): Promise<IJwt> {
		return payload;
	}
}
