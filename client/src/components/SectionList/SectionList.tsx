import React, { useState } from "react";
import Section from "../Section";

const SectionList = () => {
	const initialSection = {
		color: "",
		icon: "",
		title: "",
		tasks: [],
	};
	const [sectionsList, setSectionsList] = useState<any[]>([0]);

	const handleAddSection = (index: number) => {
		if (typeof index === "number") {
			setSectionsList([...sectionsList.splice(index, 0, 2), ...sectionsList]);
		} else {
			setSectionsList([...sectionsList, 1]);
		}
	};

	const handleDeleteSection = (index: number) => {
		setSectionsList([...sectionsList.splice(0, index), ...sectionsList.splice(index)]);
	};

	console.log(sectionsList);

	return (
		<div className="sectionList ">
			{sectionsList.map((ell, i) => (
				<Section
					key={i}
					index={i}
					handleAddSection={handleAddSection}
					handleDeleteSection={handleDeleteSection}
				/>
			))}
			<Section index={sectionsList.length} addSection handleAddSection={handleAddSection} />
		</div>
	);
};

export default SectionList;
