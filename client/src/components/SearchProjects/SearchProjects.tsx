import React, { useState } from "react";

import Modal from "../Modal";
import AddProjectFormContainer from "../AddProjectForm/AddProjectFormContainer";

export interface ISearchProjectsProps {
    onSearch: (searchText: string) => void;
}

const SearchProjects = (props: ISearchProjectsProps) => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="search-projects">
            <input className="search-projects__string" onChange={(e) => props.onSearch(e.currentTarget.value)} placeholder="Search a project..." />
            <button onClick={() => setOpenModal(true)} className="search-projects__add-project search-projects__add-project_wrapper">
                <span className="material-icons text-dark fs-32">add_circle</span>
            </button>
            {
                openModal ? <Modal size="lg" showFooter={false} title="Create project" onClose={() => setOpenModal(false)}>
                    <AddProjectFormContainer onSubmit={() => setOpenModal(false)} />
                </Modal> : null
            }
        </div>
    );
}

export default SearchProjects;
