import { Dispatch } from "redux";
import { connect } from "react-redux";

import AddBoard from "./AddBoard";
import { IAddBoardValues } from "../../api/boardProjects";
import { addBoard } from "../../reducers/boards/boardActions";
import { IAddBoard } from "../../reducers/boards/interfaces/IAddBoard";

const mapDispatchToProps = (dispatch: Dispatch<IAddBoard>) => ({
	addBoard: (value: IAddBoardValues) => dispatch(addBoard(value)),
});

const AddBoardContainer = connect(null, mapDispatchToProps);

export default AddBoardContainer(AddBoard);
