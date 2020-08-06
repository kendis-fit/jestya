import { Dispatch } from "redux";
import { connect } from "react-redux";

import BoardHeader from "./BoardHeader";
import { removeBoard } from "../../../reducers/boards/boardActions";
import { IRemoveBoard } from "../../../reducers/boards/interfaces/IRemoveBoard";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveBoard>) => ({
	removeBoard: (id: string) => dispatch(removeBoard(id)),
});

const BoardHeaderContainer = connect(null, mapDispatchToProps);

export default BoardHeaderContainer(BoardHeader);
