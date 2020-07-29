import React from "react";
import { Doughnut } from "react-chartjs-2";

export interface IProject {
    name: string;
    data: number[];
    labels: string[];
}

const getRandomColour = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const Project = (props: IProject) => {
    const datasets = [{ data: props.data, backgroundColor: props.data.map(() => getRandomColour()) }];

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
