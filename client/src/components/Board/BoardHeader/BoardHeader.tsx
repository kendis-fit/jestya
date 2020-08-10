import React, { useState, useRef } from "react";
import { useRouteMatch } from "react-router-dom";

import PopUpMenu from "./PopUpMenu";
import resource from "../../../api/resource";
import ModalContainer from "../../ModalContainer";
import { IBoard } from "../../../api/boardProjects";
import { IAddBoard } from "../../AddBoard/AddBoard";
import Modal from "../../Modal";

export interface IBoardHeader extends IBoard, IAddBoard {
	removeBoard: (id: string) => void;
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
	const { params } = useRouteMatch();
	const [showRemoveBoard, setShowRemoveBoard] = useState<boolean>(false);
	const [headerColor, setHeaderColor] = useState<string>(props.color);
	const [headerIcon, setHeaderIcon] = useState<string>(props.icon);
	const [showPopUp, setShowPopUp] = useState<boolean>(false);
	const [headerTitle, setHeaderTitle] = useState<string>(props.name);
	const [creating, setCreating] = useState<boolean>(props.name.length === 0);

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

	const handleChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
		setHeaderTitle(event.currentTarget.value);
	};

	const cancelRemoveBoard = () => {
		setHeaderTitle(props.name);
		setShowRemoveBoard(false);
	}

	const removeBoard = async () => {
		await resource.projects.removeBoard((params as any).projectId, props.id);
		props.removeBoard(props.id);
	}

	const handleBlurTitle = async (event: React.FormEvent<HTMLInputElement>) => {
		const value = event.currentTarget.value.trim();
		if (value.length === 0) {
			if (creating) {
				props.removeBoard(props.id);
			} else {
				setShowRemoveBoard(true);
			}
		} else {
			const board = {
				name: event.currentTarget.value,
				description: "",
				color: headerColor,
				icon: headerIcon,
			};
			if (board.name !== props.name) {
				if (creating) {
					await resource.projects.createBoard((params as any).projectId, board);
				} else {
					await resource.projects.updateBoard((params as any).projectId, props.id, board);
				}
			}
			setHeaderTitle(board.name);
		}
		setCreating(false);
	};

	return (
		<div className={`board__header p-2 mb-3  ${"bg-" + headerColor} `}>
			<div className="board-header__wrapperAddBtnLeft">
				<button
					className="board-header__addBtnLeft"
					onClick={() =>
						props.addBoard({
							id: Date.now().toString(),
							name: "",
							tasks: [],
							color: "indigo",
							icon: "add_alert",
						})
					}
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
					}  border-0 board-header__title`}
					type="text"
					value={headerTitle}
					onBlur={handleBlurTitle}
					onChange={handleChangeTitle}
					autoFocus
				/>
				<span
					className={`board-header__arrow${showPopUp ? "--active" : ""} material-icons`}
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
						description={props.description || "This description is excess"}
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
			{
				showRemoveBoard ? <Modal title="Removing of board" onClose={cancelRemoveBoard} onOk={removeBoard} /> : null
			}
		</div>
	);
};

export default BoardHeader;
