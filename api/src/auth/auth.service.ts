import { Injectable } from "@nestjs/common";
import { IJwt } from "./jwt.interface";
import { sign } from "jsonwebtoken";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class AuthService {
	constructor(private readonly configService: ConfigService) {}

	public signPayload(payload: IJwt) {
		return sign(payload, this.configService.config.secretKey, { expiresIn: "10h" });
	}
}
