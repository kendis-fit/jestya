export class BoardCreating {
	public name: string;
	public description!: string;

	constructor(name: string, description?: string) {
		this.name = name;
		if (description) {
			this.description = description;
		}
	}
}
