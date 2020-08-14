import { Dispatch } from "redux";
import { connect } from "react-redux";

import ArchiveProject from "./ArchiveProject";
import { archiveProject } from "../../reducers/projects/projectsActions";
import {
	IArchiveProjectAction,
	IArchiveProject,
} from "../../reducers/projects/interfaces/IArchiveProjectAction";

const mapDispatchToProps = (dispatch: Dispatch<IArchiveProjectAction>) => ({
	archiveProject: (project: IArchiveProject) => dispatch(archiveProject(project)),
});

const ArchiveProjectContainer = connect(null, mapDispatchToProps);

export default ArchiveProjectContainer(ArchiveProject);
