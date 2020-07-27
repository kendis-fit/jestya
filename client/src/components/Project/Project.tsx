import React from "react";
import { Doughnut } from "react-chartjs-2";

export interface IProject {
    name: string;
    data: number[];
    labels: string[];
}

const Project = (props: IProject) => {
    const datasets = [props.data];

    return (
        <div className="project">
            <div className="project__body">
                <label className="project__title">{props.name}</label>
                <Doughnut data={{ labels: props.labels, datasets }} />
            </div>
        </div>
    );
}

export default Project;
