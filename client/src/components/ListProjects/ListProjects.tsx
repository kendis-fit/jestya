import React from "react";

import Project from "../Project";
import AddProject from "../AddProject";
import { IProject } from "../../api/project";
import { useAuth } from "../../context/auth";

export interface IListProjects {
    projects: IProject[];
}

const ListProjects = (props: IListProjects) => {
    const { auth } = useAuth();

    return(
        <div className={`projects__content ${props.projects.length > 2 ? "projects__content--position" : ""}`}>
            {props.projects.map((project, id) => (
                <div key={id} className="project_wrapper">
                    <Project {...project} />
                </div>
            ))}
            {
                auth.user?.role !== "USER" ? <AddProject /> : null
            }
        </div>
    );
}

export default ListProjects;
