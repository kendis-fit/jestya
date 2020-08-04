import React, { useState } from "react";

import Modal from "../Modal";

export interface IProjectInfo {
    title: string;
    countTasks: number;
    description?: string;
}

const ProjectInfo = (props: IProjectInfo) => {
    const [showModal, setShowModal] = useState(false); 

    return(
        <>
            <div className="area area--filled">
                <span>Count tasks: {props.countTasks}</span>
                <span 
                    onClick={() => props.description && setShowModal(!showModal)}
                    className={`material-icons area__icon ${props.description ? "" : "area__icon--disabled"}`}
                    >info
                </span>
            </div>
            {
                showModal ? <Modal size="lg" showFooter={false} title={`Description ${props.title}`} onClose={() => setShowModal(false)}>
                    {props.description}
                </Modal>: null
            }
        </>
    );
}

export default ProjectInfo;
