import { Dispatch } from "redux";
import { connect } from "react-redux";

import SwitcherProjects from "./SwitcherProjects";
import { showArchiveProjects } from "../../reducers/showArchiveProjects/showArchiveProjectsActions";
import { IShowArchiveProjectsAction } from "../../reducers/showArchiveProjects/interfaces/IShowArchiveProjectsAction";

const mapDispatchToProps = (dispatch: Dispatch<IShowArchiveProjectsAction>) => ({
	onSwitch: (checked: boolean) => dispatch(showArchiveProjects(checked)),
});

const SwitcherProjectsContainer = connect(null, mapDispatchToProps);

export default SwitcherProjectsContainer(SwitcherProjects);
