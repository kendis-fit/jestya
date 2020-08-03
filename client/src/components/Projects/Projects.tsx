import React from "react";
import { useVanillaFetch } from "vanilla-hooks";

import Error from "../Error";
import AddProject from "../AddProject";
import Project from "../Project/Project";
import resource from "../../api/resource";
import { useAuth } from "../../context/auth";

const Projects = () => {
	document.title = "PROJECTS | JESTYA";

	const { auth } = useAuth();
	const { data: projects, loading, error, setData: setProjects } = useVanillaFetch(resource.projects.findAll);

	if (error) {
		return <Error error={error} />
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
					{
						auth.user?.role !== "USER" ? <AddProject /> : null
					}
				</div>
			</div>
		</div>
	);
};

export default Projects;
