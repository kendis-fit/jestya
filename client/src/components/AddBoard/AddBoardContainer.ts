import { Dispatch } from "redux";
import { connect } from "react-redux";

import AddBoard from "./AddBoard";
import { IBoard } from "../../api/boardProjects";
import { addBoard } from "../../reducers/boards/boardActions";
import { IAddBoard } from "../../reducers/boards/interfaces/IAddBoard";

const mapDispatchToProps = (dispatch: Dispatch<IAddBoard>) => ({
	addBoard: (board: IBoard) => dispatch(addBoard(board)),
});

const AddBoardContainer = connect(null, mapDispatchToProps);

export default AddBoardContainer(AddBoard);
