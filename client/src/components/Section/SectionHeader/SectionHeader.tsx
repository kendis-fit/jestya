import React, { useState } from "react";
import PopUpMenu from "./PopUpMenu";

interface ISectionHeader {
	index: number;
	addSection: boolean;
	handleAddSection(index?: number | React.MouseEvent<HTMLButtonElement>): void;
}

const ColorsArray = ["blue", "indigo", "purple", "pink", "red", "orange", "yellow", "green", "teal", "cyan", "gray"];
const IconsArray = [
	"error",
	"add_alert",
	"access_alarm",
	"build_circle",
	"bookmark_border",
	"bug_report",
	"check_circle",
	"code",
	"explore",
	"event",
	"favorite_border",
	"grade",
	"home",
	"language",
	"lock",
];

const SectionHeader = (props: ISectionHeader) => {
	console.log(props);
	const [headerColor, setHeaderColor] = useState<string>(ColorsArray[1]);
	const [headerIcon, setHeaderIcon] = useState<string>(IconsArray[1]);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);

	const handleChangeColor = (color: string) => {
		setHeaderColor(color);
	};
	const handleChangeIcon = (icon: string) => {
		setHeaderIcon(icon);
	};

	const handlePopUp = () => {
		setShowPopUp(!showPopUp);
	};

	return (
		<div className={`section__header p-2 mb-3  ${props.addSection ? "border-bottom" : "bg-" + headerColor} `}>
			<div className="section-header__wrapperAddBtnLeft">
				{props.addSection ? null : (
					//if not addSection show add button section before curent section
					<button className="section-header__addBtnLeft" onClick={() => props.handleAddSection(props.index)}>
						<span className="material-icons">add_circle_outline</span>
					</button>
				)}
			</div>
			{props.addSection ? (
				//if add section show add section
				<button className="btn text-info p-0 d-flex align-items-center" onClick={props.handleAddSection}>
					<span className="material-icons p-2 mr-2">add_circle_outline</span> Add Section
				</button>
			) : (
				//else show header with title of section
				<>
					<span className="section-header__icon material-icons text-white p-2 pl-3 mr-2">{headerIcon}</span>
					<input
						className={` form-control w-65 ${"bg-" + headerColor}  border-0 section-header__title`}
						type="text"
						defaultValue={"asdasd"}
					/>
					<span
						className={`section-header__arrow${showPopUp ? "--active" : ""} material-icons`}
						onClick={handlePopUp}
					>
						keyboard_arrow_down
					</span>
				</>
			)}
			{props.addSection ? null : (
				<PopUpMenu
					ShowPopUp={showPopUp}
					IconsArray={IconsArray}
					HeaderIcon={headerIcon}
					handleChangeIcon={handleChangeIcon}
					ColorsArray={ColorsArray}
					handleChangeColor={handleChangeColor}
					HeaderColor={headerColor}
				/>
			)}
		</div>
	);
};

export default SectionHeader;
