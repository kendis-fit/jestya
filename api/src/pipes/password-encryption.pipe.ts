import { createHash } from "crypto";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PasswordEncryptionPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		value.password = createHash("sha256").update(value.password).digest("hex");
		return value;
	}
}
