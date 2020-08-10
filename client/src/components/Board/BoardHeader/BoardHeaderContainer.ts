import { Dispatch } from "redux";
import { connect } from "react-redux";

import BoardHeader from "./BoardHeader";
import { IBoard } from "../../../api/boardProjects";
import { IAddBoard } from "../../../reducers/boards/interfaces/IAddBoard";
import { removeBoard, addBoard } from "../../../reducers/boards/boardActions";
import { IRemoveBoard } from "../../../reducers/boards/interfaces/IRemoveBoard";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveBoard | IAddBoard>) => ({
	addBoard: (board: IBoard) => dispatch(addBoard(board)),
	removeBoard: (id: string) => dispatch(removeBoard(id)),
});

const BoardHeaderContainer = connect(null, mapDispatchToProps);

export default BoardHeaderContainer(BoardHeader);
