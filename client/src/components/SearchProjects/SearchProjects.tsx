import React from "react";

export interface ISearchProjectsProps {
    onSearch?: (searchText: string) => void;
}

const SearchProjects = (props: ISearchProjectsProps) => {
    return (
        <div className="search-projects">
            <input className="search-projects__string" onChange={(e) => e.currentTarget.value} placeholder="Search a project..." />
        </div>
    );
}

export default SearchProjects;
