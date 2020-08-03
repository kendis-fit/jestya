import React, { useState } from "react";
import Section from "../Section";

const SectionList = () => {
	const [sectionsList, setSectionsList] = useState<any[]>([1]);

	const handleAddSection = (index: number) => {
		if (typeof index === "number") {
			setSectionsList([...sectionsList.splice(index, 0, 2), ...sectionsList]);
		} else {
			setSectionsList([...sectionsList, 1]);
		}
	};

	console.log(sectionsList);

	return (
		<div className="sectionList ">
			{sectionsList.map((ell, i) => (
				<Section key={i} index={i} handleAddSection={handleAddSection} />
			))}
			<Section index={sectionsList.length} addSection handleAddSection={handleAddSection} />
		</div>
	);
};

export default SectionList;
