import { Dispatch } from "redux";
import { connect } from "react-redux";

import ArchiveProject from "./ArchiveProject";
import { removeProject } from "../../reducers/projects/projectsActions";
import { IRemoveProjectAction } from "../../reducers/projects/interfaces/IRemoveProjectAction";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveProjectAction>) => ({
	archiveProject: (id: string) => dispatch(removeProject(id)),
});

const ArchiveProjectContainer = connect(null, mapDispatchToProps);

export default ArchiveProjectContainer(ArchiveProject);
