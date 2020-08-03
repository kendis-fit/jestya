import { Pie } from "react-chartjs-2";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Modal from "../Modal";

export interface IProject {
    id: string;
    name: string;
    description?: string;
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
    const [openModal, setOpenModal] = useState(false);
    const [isRedirected, setIsRedirected] = useState(false);
    const datasets = [{ data: props.data, backgroundColor: props.data.map(() => getRandomColour()) }];

    if (isRedirected) {
        return <Redirect to={`/projects/${props.id}`} />
    }

    return (
        <>
            <div className="top-line">
                <div className="top-line_wrapper">
                    <div className="project">
                        <div className="project__body" onClick={() => setIsRedirected(true)}>
                            <div className="project__title"><span>{props.name}</span></div>
                            <Pie data={{ labels: props.labels, datasets }} options={{ legend: { display: false } }} />
                        </div>
                        <div className="area area--filled">
                            <span>Count tasks: {props.data.length}</span>
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
