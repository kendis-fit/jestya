import { DRAG_TASK } from "../../constants";
import { IDragTaskData } from "../../../api/boardProjects";

export default interface IDragTask {
	type: typeof DRAG_TASK;
	value: IDragTaskData;
}
