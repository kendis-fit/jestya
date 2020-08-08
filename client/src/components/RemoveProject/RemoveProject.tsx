import React, { useState } from "react";

import Modal from "../Modal";
import resource from "../../api/resource";

export interface IRemoveProjectProps {
    id: string;
    title: string;
    removeProject: (id: string) => void;
}

const RemoveProject = (props: IRemoveProjectProps) => {
    const [showModal, setShowModal] = useState(false);

    const removeProject = async () => {
        await resource.projects.remove(props.id);
        props.removeProject(props.id);
        setShowModal(false);
    }

    return(
        <>
            <span
                onClick={() => setShowModal(true)} 
                className="material-icons area__icon area__icon--trash"
                >
                delete_forever
            </span>
            {
                showModal ? <Modal size="lg" title={`Are you sure you want to remove ${props.title}?`} 
                    onClose={() => setShowModal(false)}
                    onOk={removeProject}>
                </Modal> : null
            }
        </>
    ); 
}

export default RemoveProject;
