import React from "react";
import { Doughnut } from "react-chartjs-2";

export interface IChart {
    datasets: {
        data: string[];
    }[];
    labels: string[];
}

export interface IProject {
    name: string;
    data: IChart;
}

const Project = (props: IProject) => {
    return (
        <div className="project">
            <div className="project__body">
                <label className="project__title">{props.name}</label>
                <Doughnut data={props.data} />
            </div>
        </div>
    );
}

export default Project;
