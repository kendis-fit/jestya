import { SEARCH_PROJECTS } from "../../constants";

export interface ISearchProjectAction {
	type: typeof SEARCH_PROJECTS;
	value: string;
}
