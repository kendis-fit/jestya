import React from "react";

import AddProject from "../AddProject";
import { IProject } from "../../api/project";
import { useAuth } from "../../context/auth";
import ProjectContainer from "../Project/ProjectContainer";

export interface IListProjects {
    projects: IProject[];
}

const ListProjects = (props: IListProjects) => {
    const { auth } = useAuth();

    return(
        <div className="projects__content">
            {props.projects.map((project, id) => (
                <div key={id} className="project_wrapper">
                    <ProjectContainer {...project} />
                </div>
            ))}
            {
                auth.user?.role !== "USER" ? <AddProject /> : null
            }
        </div>
    );
}

export default ListProjects;
