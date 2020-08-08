import React, { useState, useRef } from "react";

import PopUpMenu from "./PopUpMenu";
import ModalContainer from "../../ModalContainer";
import { IBoard } from "../../../api/boardProjects";
import { IAddBoard } from "../../AddBoard/AddBoard";

export interface IBoardHeader extends IBoard, IAddBoard {
	removeBoard: (id: string) => void;
}

const ColorsArray = [
	"blue",
	"indigo",
	"purple",
	"pink",
	"red",
	"orange",
	"yellow",
	"green",
	"teal",
	"cyan",
	"gray",
];
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
	"phone",
	"flash_on",
	"star",
	"emoji_objects",
	"delete",
	"favorite_border",
	"print",
	"settings",
	"thumb_up",
	"thumb_down",
	"today",
	"watch_later",
	"work_outline",
];

const BoardHeader = (props: IBoardHeader) => {
	const [headerColor, setHeaderColor] = useState<string>(ColorsArray[1]);
	const [headerIcon, setHeaderIcon] = useState<string>(IconsArray[1]);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [headerTitle, setHeaderTitle] = useState<string>(props.name);
	const [creating, setCreating] = useState<boolean>(true);

	const arrowBtnRef = useRef<HTMLSpanElement>(null);

	const handleChangeColor = (color: string) => {
		setHeaderColor(color);
	};
	const handleChangeIcon = (icon: string) => {
		setHeaderIcon(icon);
	};

	const handlePopUp = () => {
		setShowPopUp(state => !state);
	};

	const handleChancheTitle = (event: React.FormEvent<HTMLInputElement>) => {
		setHeaderTitle(event.currentTarget.value);
	};

	const handleBlurTitle = (event: React.FormEvent<HTMLInputElement>) => {
		if (creating && event.currentTarget.value.trim().length === 0) {
			props.removeBoard(props.id);
		} else if (event.currentTarget.value.trim().length !== 0) {
			setHeaderTitle(event.currentTarget.value);
		}
		setCreating(false);
	};

	return (
		<div
			className={`board__header p-2 mb-3  ${"bg-" + headerColor} `}
		>
			<div className="board-header__wrapperAddBtnLeft">
				<button
					className="board-header__addBtnLeft"
					onClick={() => props.addBoard({ id: "rew", name: "rew", tasks: [] })}
				>
					<span className="material-icons">add</span>
				</button>
			</div>
			<>
				<span className="board-header__icon material-icons text-white p-2 pl-3 mr-2">
					{headerIcon}
				</span>
				<input
					className={` form-control w-65 ${
						"bg-" + headerColor
					}  border-0 section-header__title`}
					type="text"
					value={headerTitle}
					onBlur={handleBlurTitle}
					onChange={handleChancheTitle}
					autoFocus
				/>
				<span
					className={`board-header__arrow${
						showPopUp ? "--active" : ""
					} material-icons`}
					onClick={handlePopUp}
					ref={arrowBtnRef}
				>
					keyboard_arrow_down
				</span>
			</>
			{showPopUp ? null : (
				<ModalContainer isOpen={showPopUp} onClose={handlePopUp}>
					<PopUpMenu
						left={arrowBtnRef.current?.getBoundingClientRect().left}
						index={"ew"}
						IconsArray={IconsArray}
						HeaderIcon={headerIcon}
						ColorsArray={ColorsArray}
						HeaderColor={headerColor}
						handleChangeIcon={handleChangeIcon}
						handleChangeColor={handleChangeColor}
						handleDeleteBoard={props.removeBoard}
					/>
				</ModalContainer>
			)}
		</div>
	);
};

export default BoardHeader;
