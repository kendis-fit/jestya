import React, { useState } from "react";

import Modal from "../Modal";
import resource from "../../api/resource";
import { IArchiveProject } from "../../reducers/projects/interfaces/IArchiveProjectAction";

export interface IRemoveProjectProps {
    id: string;
    title: string;
    isArchive: boolean;
    archiveProject: (project: IArchiveProject) => void;
}

const ArchiveProject = (props: IRemoveProjectProps) => {
    const [showModal, setShowModal] = useState(false);
    const antiStatusProject = props.isArchive ? "unarchive" : "archive";

    const archiveProject = async () => {
        await resource.projects.archive(props.id, !props.isArchive);
        props.archiveProject({ id: props.id, isArchive: !props.isArchive });
        setShowModal(false);
    }

    return(
        <>
            <span
                onClick={() => setShowModal(true)} 
                className="material-icons area__icon area__icon--trash"
                >
                {antiStatusProject}
            </span>
            {
                showModal ? <Modal size="lg" title={`Are you sure you want to ${antiStatusProject} ${props.title}?`} 
                    onClose={() => setShowModal(false)}
                    onOk={archiveProject}>
                    You can {antiStatusProject} this project in any time
                </Modal> : null
            }
        </>
    ); 
}

export default ArchiveProject;
