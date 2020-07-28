import React, { useState } from "react";
import Section from "../Section";

const SectionList = () => {
	const arr = [1, 2];

	const [sectionsList, setSectionsList] = useState<any[]>([1]);

	const hendleAddSection = () => {
		setSectionsList([...sectionsList, 1]);
	};

	console.log(sectionsList);

	return (
		<div className="sectionList ">
			{sectionsList.map((ell, i) => (
				<Section key={i} index={i} hendleAddSection={hendleAddSection} />
			))}
			<Section index={arr.length} addSection />
		</div>
	);
};

export default SectionList;
