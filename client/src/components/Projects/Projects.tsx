import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";

import Error from "../Error";
import resource from "../../api/resource";
import { IProject } from "../../api/project";
import ListProjectsContainer from "../ListProjects/ListProjectsContainer";
import SearchProjectsContainer from "../SearchProjects/SearchProjectsContainer";
import SwitcherProjectsContainer from "../SwitcherProjects/SwitcherProjectsContainer";

export interface IProjects {
	initProjects: (project: IProject[]) => void;
}

const Projects = (props: IProjects) => {
	document.title = "PROJECTS | JESTYA";

	const { data: projects, loading, error } = useVanillaFetch(resource.projects.findAll);

	useEffect(() => {
		if (projects) {
			props.initProjects(projects);
		}
	}, [projects, props]);

	if (error) {
		return <Error error={error} />
	}

	if (loading) {
		return <div>loading...</div>
	}

	return (
		<div className="projects">
			<div className="projects__body">
				<div className="projects_config-panel_wrapper">
					<div className="config-panel">
						<SearchProjectsContainer />
						<SwitcherProjectsContainer />
					</div>
				</div>
				<ListProjectsContainer projects={[]} />
			</div>
		</div>
	);
};

export default Projects;
