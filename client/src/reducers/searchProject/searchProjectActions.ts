import { SEARCH_PROJECTS } from "../constants";
import { ISearchProjectAction } from "./interfaces/ISearchProjectAction";

export const searchProject = (value: string): ISearchProjectAction => ({
	type: SEARCH_PROJECTS,
	value: value,
});

export type SearchProjectActions = ISearchProjectAction;
