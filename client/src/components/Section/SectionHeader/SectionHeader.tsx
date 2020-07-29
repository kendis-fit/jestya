import React from "react";

const Colors = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"];

const SectionHeader = (props: any) => {
	return (
		<div className={`section__header p-2 mb-3 d-flex ${props.addSection ? "bg-secondary" : Colors[props.index]} `}>
			{props.addSection ? (
				<button className="btn text-white p-0 d-flex align-items-center" onClick={props.hendleAddSection}>
					<span className="material-icons p-2 mr-2">add_circle_outline</span> Add Section
				</button>
			) : (
				<>
					<span className="material-icons text-white p-2 mr-2">build</span>
					<input
						className={` form-control w-65 ${Colors[props.index]}  border-0 section-header__title`}
						type="text"
						defaultValue={"asdasd"}
					/>
					<span className="section-header__arrow material-icons  ">keyboard_arrow_down</span>
				</>
			)}
		</div>
	);
};

export default SectionHeader;
