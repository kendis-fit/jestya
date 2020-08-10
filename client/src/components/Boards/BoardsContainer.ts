import { Dispatch } from "redux";
import { connect } from "react-redux";

import Boards from "./Boards";
import { IBoard } from "../../api/boardProjects";
import { initBoards } from "../../reducers/boards/boardActions";
import { IInitBoards } from "../../reducers/boards/interfaces/IInitBoards";

const mapDispatchToProps = (dispatch: Dispatch<IInitBoards>) => ({
	initBoards: (boards: IBoard[]) => dispatch(initBoards(boards)),
});

const BoardsContainer = connect(null, mapDispatchToProps);

export default BoardsContainer(Boards);
