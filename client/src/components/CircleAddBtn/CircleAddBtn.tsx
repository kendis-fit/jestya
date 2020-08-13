import React from "react";

const CircleAddBtn = ({ className, ...props }: any) => {
	return (
		<button className={`circle-add-btn   ${className}`} {...props}>
			<span className="material-icons">add</span>
		</button>
	);
};

export default CircleAddBtn;
