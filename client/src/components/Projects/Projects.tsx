import React, { useEffect } from "react";
import { useVanillaFetch } from "vanilla-hooks";

import Error from "../Error";
import resource from "../../api/resource";
import { IProject } from "../../api/project";
import ListProjectsContainer from "../ListProjects/ListProjectsContainer";

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
				<ListProjectsContainer projects={[]} />
			</div>
		</div>
	);
};

export default Projects;
