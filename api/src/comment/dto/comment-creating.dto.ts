import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CommentCreating {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	public content: string;
}
