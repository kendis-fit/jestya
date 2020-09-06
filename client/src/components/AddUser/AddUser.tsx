import React, { useState, useEffect } from "react";

import Input from "../Input";
import Content from "../Content";
import resource from "../../api/resource";
import ResultSearch from "../ResultSearch";

const AddUser = () => {
    const [searchLogin, setSearchLogin] = useState("");
    const [foundUsers, setFoundUsers] = useState<any[]>([]);
    const [searchProject, setSearchProject] = useState("");
    const [foundProjects, setFoundProjects] = useState<any[]>([]);

    useEffect(() => {
        const searchUsers = async () => {
            if (searchLogin.length > 3) {
                const users = await resource.search.findUsers("login", searchLogin);
                setFoundUsers(users.map(user => ({ name: user.login })));
            } else {
                setFoundUsers([]);
            }
        }
        searchUsers();
    }, [searchLogin]);

    useEffect(() => {
        const searchProjects = async () => {
            if (searchProject.length > 3) {
                const projects = await resource.search.findProjects("name", searchProject);
                setFoundProjects(projects);
            } else {
                setFoundProjects([]);
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
                >
                    <ResultSearch search={[{ name: "Users", items: foundUsers }]} />
                </Input>
                <Input
                    value={searchProject}
                    onChange={(e: any) => setSearchProject(e.currentTarget.value)}
                    name="project-name"
                    label="Project name"
                    className="mb-3"
                    heplerText="Type a project name"
                >
                    <ResultSearch search={[{ name: "Projects", items: foundProjects }]} />
                </Input>
                <button type="submit" className="content__submit-button">Add user to project</button>
            </form>
        </Content>
    );
}

export default AddUser;
