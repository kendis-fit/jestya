import React from "react";

const Search = () => {
    return(
        <li className="search search_actions__items_wrapper">
            <span className="material-icons search__button">search</span>
            <input type="text" className="search__input" placeholder="Search a project or task..." />
        </li>
    );
}

export default Search;
