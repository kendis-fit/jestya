import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ProjectInfo from "../ProjectInfo";
import { IProject } from "../../api/project";

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
    const datasets = [{ data: props.boards.map(board => board.countTasks), backgroundColor: props.boards.map(() => getRandomColour()) }];
    const countTasks = props.boards.reduce((first, second) => first + second.countTasks, 0);

    if (isRedirected) {
        return <Redirect to={`/projects/${props.id}`} />
    }

    return (
        <>
            <div className="top-line">
                <div className="top-line_wrapper">
                    <div className="project">
                        <div className="project__body" onClick={() => setIsRedirected(true)}>
                            <div className="project__title" title={props.name}><span>{props.name.length > 12 ? props.name.slice(0, 12) + "..." : props.name}</span></div>
                            {
                                countTasks !== 0 ?
                                    <Pie data={{ labels: props.boards.map(board => board.name), datasets }} options={{ legend: { display: false } }} />
                                    : <div className="project__empty">
                                        <span className="material-icons fs-28">content_paste</span>
                                        <span>No Tasks</span>
                                    </div>
                            }
                        </div>
                        <ProjectInfo id={props.id} description={props.description} title={props.name} countTasks={countTasks} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;
