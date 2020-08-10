import { Dispatch } from "redux";
import { connect } from "react-redux";

import Boards from "./Boards";
import { IBoard, IDragIndexs } from "../../api/boardProjects";
import { initBoards, dragBoard } from "../../reducers/boards/boardActions";
import { IInitBoards } from "../../reducers/boards/interfaces/IInitBoards";
import { IDragBoard } from "../../reducers/boards/interfaces/IDragBoard";

const mapDispatchToProps = (dispatch: Dispatch<IInitBoards | IDragBoard>) => ({
	initBoards: (boards: IBoard[]) => dispatch(initBoards(boards)),
	dragBoard: (result: IDragIndexs) => dispatch(dragBoard(result)),
});

const BoardsContainer = connect(null, mapDispatchToProps);

export default BoardsContainer(Boards);
