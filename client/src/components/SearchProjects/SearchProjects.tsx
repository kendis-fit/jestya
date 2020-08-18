import React from "react";

export interface ISearchProjectsProps {
    onSearch: (searchText: string) => void;
}

const SearchProjects = (props: ISearchProjectsProps) => {
    return (
        <div className="search-projects">
            <input className="search-projects__string" onChange={(e) => props.onSearch(e.currentTarget.value)} placeholder="Search a project..." />
            {/* <button className="search-projects__add-project search-projects__add-project_wrapper">
                <span className="material-icons fs-32">add_circle</span>
            </button> */}
        </div>
    );
}

export default SearchProjects;
