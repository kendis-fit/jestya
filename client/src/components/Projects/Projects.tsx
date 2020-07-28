import React from "react";

import Project from "../Project/Project";
import resource from "../../api/resource";
import { useVanillaFetch } from "vanilla-hooks";

const Projects = () => {
	const { data: projects, loading } = useVanillaFetch(resource.projects.findAll);
	
	if (loading) {
		return <div>loading...</div>
	}

	return (
		<div className="projects">
			<div className="projects__body">
				<div className="projects__title">My projects</div>
				<div className="projects__content">
					{
						projects.map(project => 
							<div className="project_wrapper">
								<Project {...project} />
							</div>
						)
					}
				</div>
			</div>
		</div>
	);
};

export default Projects;
