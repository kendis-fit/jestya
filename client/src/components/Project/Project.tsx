import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Modal from "../Modal";
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
    const [openModal, setOpenModal] = useState(false);
    const [isRedirected, setIsRedirected] = useState(false);
    const datasets = [{ data: props.boards.map(board => board.countTasks), backgroundColor: props.boards.map(() => getRandomColour()) }];

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
                            <Pie data={{ labels: props.boards.map(board => board.name), datasets }} options={{ legend: { display: false } }} />
                        </div>
                        <div className="area area--filled">
                            <span>Count tasks: {props.boards.length}</span>
                            <span onClick={() => props.description && setOpenModal(!openModal)} className={`material-icons area__icon ${props.description ? "" : "area__icon--disabled"}`}>info</span>
                        </div>
                    </div>
                </div>
            </div>
            {
                openModal ? <Modal size="lg" showFooter={false} title="Description" onClose={() => setOpenModal(false)}>
                    {props.description}
                </Modal>: null
            }
        </>
    );
}

export default Project;
