import { createHash } from "crypto";
import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PasswordEncryptionPipe implements PipeTransform {
	constructor(private readonly fields: string[]) {}

	public transform(value: any, metadata: ArgumentMetadata) {
		if (metadata && metadata.type === "body") {
			for (const field of this.fields) {
				value[field] = createHash("sha256").update(value[field]).digest("hex");
			}
		}
		return value;
	}
}
