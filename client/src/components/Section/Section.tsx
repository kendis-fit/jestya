import React, { useState } from "react";
import Task from "./Task";

const Section = (props: any) => {
	return (
		<div className="section" style={{ background: props.index % 2 === 0 ? "#fafafa" : "#f2f2f2" }}>
			<div className={`section__header p-2 mb-3 d-flex ${props.addSection ? "bg-secondary" : "bg-primary"} `}>
				{props.addSection ? (
					<button className="btn text-white p-0 d-flex align-items-center">
						<span className="material-icons p-2 mr-2">add_circle_outline</span> Add Section
					</button>
				) : (
					<>
						<span className="material-icons text-white p-2 mr-2">build</span>
						<input className="form-control w-75 " type="text" value={"asdasd"} />{" "}
					</>
				)}
			</div>
			<Task />
			<Task />
			<button
				className="
				section__button
				text-primary
				rounded-circle
				btn 
				bg-white
				shadow"
			>
				<span className="material-icons">add_circle_outline</span>
			</button>
		</div>
	);
};

export default Section;
