import { Dispatch } from "redux";
import { connect } from "react-redux";

import RemoveProject from "./RemoveProject";
import { removeProject } from "../../reducers/projects/projectsActions";
import { IRemoveProjectAction } from "../../reducers/projects/interfaces/IRemoveProjectAction";

const mapDispatchToProps = (dispatch: Dispatch<IRemoveProjectAction>) => ({
	removeProject: (id: string) => dispatch(removeProject(id)),
});

const RemoveProjectContainer = connect(null, mapDispatchToProps);

export default RemoveProjectContainer(RemoveProject);
