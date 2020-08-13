import React from "react";

import DescriptionProject from "../DescriptionProject";
import ArchiveProjectContainer from "../ArchiveProject/ArchiveProjectContainer";

export interface IProjectInfo {
    id: string;
    title: string;
    countTasks: number;
    description?: string;
    isArchive: boolean;
}

const ProjectInfo = (props: IProjectInfo) => {
    return(
        <>
            <div className="area area--filled">
                <span>Count tasks: {props.countTasks}</span>
                <div>
                    <DescriptionProject {...props} />
                    <ArchiveProjectContainer {...props} />
                </div>
            </div>
            
        </>
    );
}

export default ProjectInfo;
