import { connect } from "react-redux";

import ListProjects from "./ListProjects";
import { IRootState } from "../../reducers/reducer";

const mapStateToProps = (state: IRootState) => ({
	projects: state.projects.filter(project => {
		let flag = project.name.includes(state.searchProject);
		if (!state.showArchiveProjects && project.isArchive) {
			return false;
		}
		return flag;
	}),
});

const ListProjectsContainer = connect(mapStateToProps, null);

export default ListProjectsContainer(ListProjects);
