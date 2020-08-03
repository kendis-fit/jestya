import React, { useState } from "react";
import Modal from "../Modal";
import AddProjectForm from "../AddProjectForm";

const AddProject = () => {
    const [openModal, setOpenModal] = useState(false);

    return(
        <>
            <div className="project_wrapper">
                <div className="top-line">
                    <div className="top-line_wrapper">
                        <div className="project" onClick={() => setOpenModal(!openModal)}>
                            <div className="project__body project__body--size">
                                <span className="material-icons d-block fs-36">add_circle_outline</span>
                                <span className="fs-24">Add project</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                openModal ? <Modal size="lg" showFooter={false} title="Create project" onClose={() => setOpenModal(false)}>
                    <AddProjectForm />
                </Modal> : null
            }
        </>
    );
}

export default AddProject;