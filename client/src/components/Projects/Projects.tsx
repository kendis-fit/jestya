import React from "react";
import { Redirect } from "react-router-dom";
import { useVanillaFetch } from "vanilla-hooks";

import Project from "../Project/Project";
import resource from "../../api/resource";

const Projects = () => {
	document.title = "PROJECTS | JESTYA";

	const { data: projects, loading, error } = useVanillaFetch(resource.projects.findAll);

	if (error) {
		return <Redirect to={`/not-available/projects`} />
	}

	if (loading) {
		return <div>loading...</div>
	}

	return (
		<div className="projects">
			<div className="projects__body">
				<div className="projects__content">
					{projects.map((project, id) => (
						<div key={id} className="project_wrapper">
							<Project {...project} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Projects;
