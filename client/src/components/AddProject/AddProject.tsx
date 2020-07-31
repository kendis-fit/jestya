import React from "react";

const AddProject = () => {
    return(
        <div className="project_wrapper">
            <div className="top-line">
                <div className="top-line_wrapper">
                    <div className="project">
                        <div className="project__body project__body--size">
                            <span className="material-icons d-block fs-36">add_circle_outline</span>
                            <span className="fs-24">Add project</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProject;