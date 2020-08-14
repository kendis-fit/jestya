import React from "react";

import Checkbox from "../Checkbox";

export interface ISwitcherProjects {
    onSwitch: (checked: boolean) => void;
}

const SwitcherProjects = (props: ISwitcherProjects) => {
    return(
        <div className="config-panel__switcher_wrapper">
            <Checkbox onChange={(e) => props.onSwitch(e.currentTarget.checked)} className="config-panel__switcher" label="Show archive projects as well" isSwitch />
        </div>
    );
}

export default SwitcherProjects;
