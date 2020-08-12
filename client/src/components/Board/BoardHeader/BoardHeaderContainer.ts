import { Dispatch } from "redux";
import { connect } from "react-redux";

import BoardHeader from "./BoardHeader";
import { IBoard } from "../../../api/boardProjects";
import { IAddBoard } from "../../../reducers/boards/interfaces/IAddBoard";
import { IRemoveBoard } from "../../../reducers/boards/interfaces/IRemoveBoard";
import { removeBoard, addBoard, updateBoard } from "../../../reducers/boards/boardActions";
import {
	IUpdateBoardAction,
	IUpdateBoard,
} from "../../../reducers/boards/interfaces/IUpdateBoardAction";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveBoard | IAddBoard | IUpdateBoardAction>) => ({
	addBoard: (board: IBoard) => dispatch(addBoard(board)),
	removeBoard: (id: string) => dispatch(removeBoard(id)),
	updateBoard: (board: IUpdateBoard) => dispatch(updateBoard(board)),
});

const BoardHeaderContainer = connect(null, mapDispatchToProps);

export default BoardHeaderContainer(BoardHeader);
