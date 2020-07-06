import { sign } from "jsonwebtoken";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { IJwt } from "./jwt.interface";

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	public signPayload(payload: IJwt) {
		const secretKey = this.configService.get<string>("jwt.secretKey");
		return sign(payload, secretKey, { expiresIn: "10h" });
	}
}
