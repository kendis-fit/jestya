import { INIT_TASKS } from "../../constants";
import { ITask } from "../../../api/boardProjects";

export interface IInitTasks {
	type: typeof INIT_TASKS;
	value: ITask[];
}
