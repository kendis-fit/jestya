import { connect } from "react-redux";

import ListProjects from "./ListProjects";
import { IRootState } from "../../reducers/reducer";

const mapStateToProps = (state: IRootState) => ({
	projects: state.projects,
});

const ListProjectsContainer = connect(mapStateToProps, null);

export default ListProjectsContainer(ListProjects);
