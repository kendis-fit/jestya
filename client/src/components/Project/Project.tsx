import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import ProjectInfo from "../ProjectInfo";
import { IProject as IProjectApi } from "../../api/project";
import { IProject } from "../../reducers/project/interfaces/IProject";

const getRandomColour = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export interface IProjectProps extends IProjectApi {
    selectProject: (project: IProject) => void;
}

const Project = (props: IProjectProps) => {
    const [isRedirected, setIsRedirected] = useState(false);
    const datasets = [{ data: props.boards.map(board => board.countTasks), backgroundColor: props.boards.map(() => getRandomColour()) }];
    const countTasks = props.boards.reduce((first, second) => first + second.countTasks, 0);

    if (isRedirected) {
        props.selectProject({...props});
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
                                        <span>No Boards</span>
                                    </div>
                            }
                        </div>
                        <ProjectInfo title={props.name} countTasks={countTasks} description={props.description} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Project;
