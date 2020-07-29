import React, { useState } from "react";
import Section from "../Section";

const SectionList = () => {
	const [sectionsList, setSectionsList] = useState<any[]>([1]);

	const hendleAddSection = () => {
		console.log("tut");

		setSectionsList([...sectionsList, 1]);
	};

	console.log(sectionsList);

	return (
		<div className="sectionList ">
			{sectionsList.map((ell, i) => (
				<Section key={i} index={i} />
			))}
			<Section index={sectionsList.length} addSection hendleAddSection={hendleAddSection} />
		</div>
	);
};

export default SectionList;
