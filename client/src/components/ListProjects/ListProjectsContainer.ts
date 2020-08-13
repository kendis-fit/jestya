import { connect } from "react-redux";

import ListProjects from "./ListProjects";
import { IRootState } from "../../reducers/reducer";

const mapStateToProps = (state: IRootState) => ({
	projects: state.projects.filter(project => project.name.includes(state.searchProject)),
});

const ListProjectsContainer = connect(mapStateToProps, null);

export default ListProjectsContainer(ListProjects);
