import { connect } from "react-redux";
import Project from "./Project";
import { Dispatch } from "redux";
import { ISelectedProject } from "../../reducers/project/interfaces/ISelectedProject";
import { IProject } from "../../reducers/project/interfaces/IProject";
import { selectProject } from "../../reducers/project/projectActions";

const mapDispatchToProps = (dispatch: Dispatch<ISelectedProject>) => ({
	selectProject: (project: IProject) => dispatch(selectProject(project)),
});

const ProjectContainer = connect(null, mapDispatchToProps);

export default ProjectContainer(Project);
