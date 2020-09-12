import React, { useState } from "react";

import Content from "../Content";
import resource from "../../api/resource";
import InputWithSearch from "../InputWithSearch";

const AddUser = () => {
    const [userId, setUserId] = useState<string>("");
    const [projectId, setProjectId] = useState<string>("");

    const addUser = async () => {
        await resource.projects.addUser(projectId, userId);
    }

    return(
        <Content title="Additing of user">
            <form onSubmit={e => {
                e.preventDefault();
                addUser();
            }}>
                <InputWithSearch
                    label="User"
                    nameSearch="Users"
                    helperText="Type a user login"
                    resource={(value: string) => resource.search.findUsers("login", value)}
                    onChoose={id => setUserId(id)}
                    />
                <InputWithSearch
                    label="Project"
                    nameSearch="Projects"
                    helperText="Type a project name"
                    resource={(value: string) => resource.search.findProjects("name", value)}
                    onChoose={id => setProjectId(id)}
                    />
                <button type="submit" className="content__submit-button">Add user to project</button>
            </form>
        </Content>
    );
}

export default AddUser;
