import { Controller, Get, Query } from "@nestjs/common";

import { SearchResult } from "./dto/search-result.dto";
import { SearchService } from "./search.service";

@Controller("search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get("users")
	public async getUsers(
		@Query("field") field: string,
		@Query("value") value: string
	): Promise<SearchResult[]> {
		const users = await this.searchService.getUsers(field, value);
		return users.map(user => new SearchResult(user));
	}

	@Get("projects")
	public async getProjects(
		@Query("field") field: string,
		@Query("value") value: string
	): Promise<SearchResult[]> {
		const projects = await this.searchService.getProjects(field, value);
		return projects.map(project => new SearchResult(project));
	}
}
