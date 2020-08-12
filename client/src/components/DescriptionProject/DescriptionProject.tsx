import React, { useState } from "react";
import Modal from "../Modal";

export interface IDescriptionProject {
    title: string;
    description?: string;
}

const DescriptionProject = (props: IDescriptionProject) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <span 
                onClick={() => props.description && setShowModal(true)}
                className={`material-icons area__icon ${props.description ? "" : "area__icon--disabled"}`}
                >info
            </span>
            {
                showModal ? <Modal size="lg" showFooter={false} title={`Description ${props.title}`} onClose={() => setShowModal(false)}>
                    {props.description}
                </Modal>: null
            }
        </>
    );
}

export default DescriptionProject;
