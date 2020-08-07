import React, { useState, useRef, useEffect } from "react";
import PopUpMenu from "./PopUpMenu";
import ModalContainer from "../../ModalContainer";

export interface IBoardHeader {
	index: number;
	addBoard: boolean;
	handleAddBoard(index?: number | React.MouseEvent<HTMLButtonElement>): void;
	handleDeleteBoard(index: number): void;
	boardData: any;
}

const ColorsArray = [
	"indigo",
	"purple",
	"pink",
	"red",
	"orange",
	"yellow",
	"green",
	"teal",
	"cyan",
	"blue",
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
	"speed",
	"print",
	"settings",
	"thumb_up",
	"thumb_down",
	"today",
	"watch_later",
	"work_outline",
];

const BoardHeader = (props: IBoardHeader) => {
	const { boardData = { title: "", color: ColorsArray[0], icon: IconsArray[0] } } = props;

	console.log(boardData);

	const [headerData, setHeaderData] = useState<any>({
		title: "",
		icon: IconsArray[2],
		color: ColorsArray[0],
	});
	const [headerColor, setHeaderColor] = useState<string>(ColorsArray[3]);
	const [headerIcon, setHeaderIcon] = useState<string>(IconsArray[2]);
	const [headerTitle, setHeaderTitle] = useState<string>("");
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [creating, setCreating] = useState<boolean>(true);

	useEffect(() => {
		setHeaderColor(boardData.color);
		setHeaderIcon(boardData.icon);
		setHeaderTitle(boardData.title);
		// setHeaderData(boardData);
	}, [boardData]);
	// useEffect(() => {
	// 	setHeaderColor(ColorsArray[0]);
	// 	setHeaderIcon(IconsArray[0]);
	// 	setHeaderTitle("");
	// 	// setHeaderData(boardData);
	// }, [boardData]);

	// console.log("XAX", headerColor, headerIcon, headerTitle);

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
			props.handleDeleteBoard(props.index);
		} else if (event.currentTarget.value.trim().length !== 0) {
			// title = headerTitle;
		} else {
			setHeaderTitle(boardData.title);
		}
		setCreating(false);
	};

	return (
		<div
			className={`board__header p-2 mb-3  ${
				props.addBoard ? "border-bottom" : "bg-" + headerColor
			} `}
		>
			<div className="board-header__wrapperAddBtnLeft">
				{props.addBoard ? null : (
					//if not addSection show add button section before curent section
					<button
						className="board-header__addBtnLeft"
						onClick={() => props.handleAddBoard(props.index)}
					>
						<span className="material-icons">add</span>
					</button>
				)}
			</div>
			{props.addBoard ? (
				//if add section show add section
				<button
					className="btn text-info p-0 d-flex align-items-center"
					onClick={props.handleAddBoard}
				>
					<span className="material-icons p-2 mr-2">add</span> Add Section
				</button>
			) : (
				//else show header with title of board
				<>
					<span className="board-header__icon material-icons text-white p-2 pl-3 mr-2">
						{headerIcon}
					</span>
					<input
						className={` form-control w-65 ${
							"bg-" + headerColor
						}  border-0 board-header__title`}
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
			)}
			{props.addBoard && showPopUp ? null : (
				<ModalContainer isOpen={showPopUp} onClose={handlePopUp}>
					<PopUpMenu
						left={arrowBtnRef.current?.getBoundingClientRect().left}
						index={props.index}
						IconsArray={IconsArray}
						HeaderIcon={headerIcon}
						ColorsArray={ColorsArray}
						HeaderColor={headerColor}
						handleChangeIcon={handleChangeIcon}
						handleChangeColor={handleChangeColor}
						handleDeleteBoard={props.handleDeleteBoard}
					/>
				</ModalContainer>
			)}
		</div>
	);
};

export default BoardHeader;
