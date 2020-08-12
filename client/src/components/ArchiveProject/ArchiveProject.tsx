import React, { useState } from "react";

import Modal from "../Modal";
import resource from "../../api/resource";

export interface IRemoveProjectProps {
    id: string;
    title: string;
    archiveProject: (id: string) => void;
}

const ArchiveProject = (props: IRemoveProjectProps) => {
    const [showModal, setShowModal] = useState(false);

    const removeProject = async () => {
        await resource.projects.archive(props.id);
        props.archiveProject(props.id);
        setShowModal(false);
    }

    return(
        <>
            <span
                onClick={() => setShowModal(true)} 
                className="material-icons area__icon area__icon--trash"
                >
                archive
            </span>
            {
                showModal ? <Modal size="lg" title={`Are you sure you want to archive ${props.title}?`} 
                    onClose={() => setShowModal(false)}
                    onOk={removeProject}>
                    You can unarchive this project in any time
                </Modal> : null
            }
        </>
    ); 
}

export default ArchiveProject;
