import { Dispatch } from "redux";
import { connect } from "react-redux";

import Projects from "./Projects";
import { IProject } from "../../api/project";
import { initProjects } from "../../reducers/projects/projectsActions";
import { IInitProjectsAction } from "../../reducers/projects/interfaces/IInitProjectsAction";

const mapDispatchToProps = (dispatch: Dispatch<IInitProjectsAction>) => ({
	initProjects: (projects: IProject[]) => dispatch(initProjects(projects)),
});

const ProjectsContainer = connect(null, mapDispatchToProps);

export default ProjectsContainer(Projects);
