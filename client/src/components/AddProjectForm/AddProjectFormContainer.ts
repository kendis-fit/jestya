import { Dispatch } from "redux";
import { connect } from "react-redux";

import AddProjectForm from ".";
import { IProject } from "../../api/project";
import { addProject } from "../../reducers/projects/projectsActions";
import { IAddProjectAction } from "../../reducers/projects/interfaces/IAddProjectAction";

const mapDispatchToProps = (dispatch: Dispatch<IAddProjectAction>) => ({
	addProject: (project: IProject) => dispatch(addProject(project)),
});

const AddProjectFormContainer = connect(null, mapDispatchToProps);

export default AddProjectFormContainer(AddProjectForm);
