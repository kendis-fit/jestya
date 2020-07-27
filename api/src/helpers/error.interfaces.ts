import { ApiProperty } from "@nestjs/swagger";

export class Error {
	@ApiProperty()
	public message: string;
}

class ValidationDetail {
	@ApiProperty()
	public property: string;

	@ApiProperty()
	public constraints: {
		[key: string]: string;
	};
}

export class ErrorBadRequest {
	@ApiProperty({ type: ValidationDetail })
	public message: ValidationDetail[];
}
