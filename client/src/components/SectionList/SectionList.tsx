import React from "react";
import Section from "../Section";

const SectionList = () => {
	const arr = [1, 2];
	return (
		<div className="sectionList ">
			{arr.map((ell, i) => (
				<Section key={i} index={i} />
			))}
			<Section index={arr.length} addSection />
		</div>
	);
};

export default SectionList;
