import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

export interface IProject {
    id: string;
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
    const [isRedirected, setIsRedirected] = useState(false);
    const datasets = [{ data: props.data, backgroundColor: props.data.map(() => getRandomColour()) }];

    if (isRedirected) {
        return <Redirect to={`/projects/${props.id}`} />
    }

    return (
        <div className="top-line" onClick={() => setIsRedirected(true)}>
            <div className="top-line_wrapper">
                <div className="project">
                    <div className="project__body">
                        <div className="project__title"><span>{props.name}</span></div>
                        <Pie data={{ labels: props.labels, datasets }} options={{ legend: { display: false } }} />
                    </div>
                    <div className="area area--filled">
                        Count tasks: {props.data.length}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Project;
