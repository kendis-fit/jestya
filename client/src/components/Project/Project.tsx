import React from "react";
import { Doughnut } from "react-chartjs-2";

export interface IProject {
    name: string;
    data: number[];
    labels: string[];
}

const Project = (props: IProject) => {
    const datasets = [{ data: props.data, backgroundColor: ["blue", "red", "green"] }];

    return (
        <div className="project">
            <div className="project__body">
                <div className="project__title"><span>{props.name}</span></div>
                <Doughnut data={{ labels: props.labels, datasets }} options={{ legend: { display: false } }} />
            </div>
        </div>
    );
}

export default Project;
