import React from "react";

import DescriptionProject from "../DescriptionProject";
import RemoveProjectContainer from "../RemoveProject/RemoveProjectContainer";

export interface IProjectInfo {
    id: string;
    title: string;
    countTasks: number;
    description?: string;
}

const ProjectInfo = (props: IProjectInfo) => {
    return(
        <>
            <div className="area area--filled">
                <span>Count tasks: {props.countTasks}</span>
                <div>
                    <DescriptionProject {...props} />
                    <RemoveProjectContainer {...props} />
                </div>
            </div>
            
        </>
    );
}

export default ProjectInfo;
