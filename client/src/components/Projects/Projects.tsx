import React from "react";
import { Redirect } from "react-router-dom";
import { useVanillaFetch } from "vanilla-hooks";

import Project from "../Project/Project";
import resource from "../../api/resource";
import { useAuth } from "../../context/auth";
import AddProject from "../AddProject";

const Projects = () => {
	document.title = "PROJECTS | JESTYA";

	const { auth } = useAuth();
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
					{
						auth.user?.role !== "USER" ? <AddProject /> : null
					}
				</div>
			</div>
		</div>
	);
};

export default Projects;
