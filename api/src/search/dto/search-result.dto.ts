import { ApiProperty } from "@nestjs/swagger";

export class SearchResult {
	@ApiProperty()
	public id: string;

	@ApiProperty()
	public name: string;

	@ApiProperty()
	public description?: string;

	constructor(search: SearchResult) {
		this.id = search.id;
		this.name = search.name;
		this.description = search.description;
	}
}
