import { connect } from "react-redux";

import ListBoards from "./ListBoards";
import { IRootState } from "../../reducers/reducer";

const mapStateToProps = (state: IRootState) => ({
	boards: state.boards,
});

const ListBoardsContainer = connect(mapStateToProps, null);

export default ListBoardsContainer(ListBoards);
