import React, { useState, useEffect } from "react";

import Input from "../Input";
import Content from "../Content";
import resource from "../../api/resource";

const AddUser = () => {
    const [searchLogin, setSearchLogin] = useState("");
    const [searchProject, setSearchProject] = useState("");

    useEffect(() => {
        const searchUsers = async () => {
            if (searchLogin.length > 3) {
                const users = await resource.search.findUsers("login", searchLogin);
                console.log(users);
            }
        }
        searchUsers();
    }, [searchLogin]);

    useEffect(() => {
        const searchProjects = async () => {
            if (searchProject.length > 3) {
                const projects = await resource.search.findProjects("name", searchProject);
                console.log(projects);
            }
        }
        searchProjects();
    }, [searchProject]);

    return(
        <Content title="Additing of user">
            <form>
                <Input
                    value={searchLogin}
                    onChange={(e: any) => setSearchLogin(e.currentTarget.value)}
                    name="user-login"
                    label="User login"
                    className="mb-3"
                    heplerText="Type a user login"
                />
                <Input
                    value={searchProject}
                    onChange={(e: any) => setSearchProject(e.currentTarget.value)}
                    name="project-name"
                    label="Project name"
                    className="mb-3"
                    heplerText="Type a project name"
                />
                <button type="submit" className="content__submit-button">Add user to project</button>
            </form>
        </Content>
    );
}

export default AddUser;
