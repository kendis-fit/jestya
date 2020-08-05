import React, { useState, useRef } from "react";
import PopUpMenu from "./PopUpMenu";
import ModalContainer from "../../ModalContainer";

interface IBoardHeader {
	index: number;
	addBoard: boolean;
	handleAddBoard(index?: number | React.MouseEvent<HTMLButtonElement>): void;
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

const BoardHeader = (props: any) => {
	const [headerColor, setHeaderColor] = useState<string>(ColorsArray[1]);
	const [headerIcon, setHeaderIcon] = useState<string>(IconsArray[1]);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);

	const arrowBtnRef = useRef<HTMLSpanElement>(null);

	const handleChangeColor = (color: string) => {
		setHeaderColor(color);
	};
	const handleChangeIcon = (icon: string) => {
		setHeaderIcon(icon);
	};

	const handlePopUp = () => {
		setShowPopUp(state => !state);
		console.log(arrowBtnRef.current?.getBoundingClientRect().left);
		
	};

	return (
		<div className={`board__header p-2 mb-3  ${props.addBoard ? "border-bottom" : "bg-" + headerColor} `}>
			<div className="board-header__wrapperAddBtnLeft">
				{props.addBoard ? null : (
					//if not addBoard show add button board before curent board
					<button className="board-header__addBtnLeft" onClick={() => props.handleAddBoard(props.index)}>
						<span className="material-icons">add</span>
					</button>
				)}
			</div>
			{props.addBoard ? (
				//if add board show add board
				<button className="btn text-info p-0 d-flex align-items-center" onClick={props.handleAddBoard}>
					<span className="material-icons p-2 mr-2">add</span> Add Board
				</button>
			) : (
				//else show header with title of board
				<>
					<span className="board-header__icon material-icons text-white p-2 pl-3 mr-2">{headerIcon}</span>
					<input
						className={` form-control w-65 ${"bg-" + headerColor}  border-0 board-header__title`}
						type="text"
						defaultValue={"asdasd"}
					/>
					<span
						className={`board-header__arrow${showPopUp ? "--active" : ""} material-icons`}
						onClick={handlePopUp}
						ref={arrowBtnRef}
					>
						keyboard_arrow_down
					</span>
				</>
			)}
			{props.addBoard && showPopUp ? null : (
				<ModalContainer isOpen={showPopUp} onClose={handlePopUp}>
					<PopUpMenu
						left={arrowBtnRef.current?.getBoundingClientRect().left}
						index={props.index}
						IconsArray={IconsArray}
						HeaderIcon={headerIcon}
						handleChangeIcon={handleChangeIcon}
						ColorsArray={ColorsArray}
						handleChangeColor={handleChangeColor}
						HeaderColor={headerColor}
					/>
				</ModalContainer>
			)}
		</div>
	);
};

export default BoardHeader;
