import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from "@nestjs/common";

@Injectable()
export class ParseEnumPipe implements PipeTransform<string> {
	constructor(private readonly type: any) {}

	transform(value: string, metadata: ArgumentMetadata) {
		if (!Object.values(this.type).includes(value)) {
			throw new BadRequestException("Value doesn't contain in a specific type");
		}
		return value;
	}
}
