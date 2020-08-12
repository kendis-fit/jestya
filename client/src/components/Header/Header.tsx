import React from "react";

import Actions from "../Actions";
import ProfileActions from "../ProfileActions";

const Header = () => {
    const showMenu = () => {
        const menuDOM = document.querySelector("#menu");
        menuDOM?.classList?.add("actions--menu-show");
    }

    return(
        <header className="header">
            <div className="header__main-container">
                <button className="header__menu" onClick={showMenu}>
                    <span className="material-icons">menu</span>
                </button>
                <Actions />
                <ProfileActions />
            </div>
        </header>
    );
}

export default Header;
