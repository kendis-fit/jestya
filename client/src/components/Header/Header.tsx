import React from "react";

import Actions from "../Actions";
import ProfileActions from "../ProfileActions";

const Header = () => {
    return(
        <header className="header">
            <div className="header__main-container">
                <Actions />
                <ProfileActions />
            </div>
        </header>
    );
}

export default Header;
