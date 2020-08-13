import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";

import Error from "../Error";
import Checkbox from "../Checkbox";
import resource from "../../api/resource";
import { IProject } from "../../api/project";
import ListProjectsContainer from "../ListProjects/ListProjectsContainer";
import SearchProjectsContainer from "../SearchProjects/SearchProjectsContainer";

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
						<div className="config-panel__switcher_wrapper">
							<Checkbox className="config-panel__switcher" label="Show archive projects as well" isSwitch />
						</div>
					</div>
				</div>
				<ListProjectsContainer projects={[]} />
			</div>
		</div>
	);
};

export default Projects;
