import { Dispatch } from "redux";
import { connect } from "react-redux";

import Boards from "./Boards";
import { IBoard, IDragIndexs, IDragTaskData } from "../../api/boardProjects";
import { initBoards, dragBoard, dragTask } from "../../reducers/boards/boardActions";
import { IInitBoards } from "../../reducers/boards/interfaces/IInitBoards";
import { IDragBoard } from "../../reducers/boards/interfaces/IDragBoard";
import IDragTask from "../../reducers/boards/interfaces/IDragTask";

const mapDispatchToProps = (dispatch: Dispatch<IInitBoards | IDragBoard | IDragTask>) => ({
	initBoards: (boards: IBoard[]) => dispatch(initBoards(boards)),
	dragBoard: (result: IDragIndexs) => dispatch(dragBoard(result)),
	dragTask: (result: IDragTaskData) => dispatch(dragTask(result)),
});

const BoardsContainer = connect(null, mapDispatchToProps);

export default BoardsContainer(Boards);
