import React from "react";

import Input from "../Input";
import Content from "../Content";

const AddUser = () => {
    return(
        <Content title="Additing of user">
            <form>
                <Input 
                    name="user-login"
                    label="User login"
                    className="mb-3"
                    heplerText="Type a user login"
                />
                <Input
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
