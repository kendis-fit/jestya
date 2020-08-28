import { Controller, Get, Query } from "@nestjs/common";

import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get("users")
	public async getUsers(@Query("field") field: string, @Query("value") value: string) {
		return this.searchService.getUsers(field, value);
	}

	@Get("projects")
	public async getProjects(@Query("field") field: string, @Query("value") value: string) {
		return this.searchService.getProjects(field, value);
	}
}
