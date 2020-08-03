import { ApiProperty } from "@nestjs/swagger";

export class Error {
	@ApiProperty()
	public message: string;

	@ApiProperty()
	public statusCode: string;
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

	@ApiProperty()
	public statusCode: string;
}
