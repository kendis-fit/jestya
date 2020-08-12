import { ApiProperty } from "@nestjs/swagger";

export class BoardUpdate {
	@ApiProperty()
	public name?: string;

	@ApiProperty()
	public description?: string;

	@ApiProperty()
	public color?: string;

	@ApiProperty()
	public icon?: string;

	@ApiProperty()
	public position?: number;
}
