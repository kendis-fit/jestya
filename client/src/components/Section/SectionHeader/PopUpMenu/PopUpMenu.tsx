import React from "react";

interface IPopUpMenu {
	ShowPopUp?: boolean;
	ColorsArray: string[];
	IconsArray: string[];
	HeaderColor: string;
	HeaderIcon: string;
	index: number;
	handleChangeColor(color: string): void;
	handleChangeIcon(icon: string): void;
}

const PopUpMenu = (props: IPopUpMenu) => {
	const { ColorsArray, HeaderColor, HeaderIcon, handleChangeColor, handleChangeIcon, IconsArray } = props;
	return (
		<div className={`section-header__popUpMenu p-2 `} style={{ left: `${147 + props.index * 350}px` }}>
			<div className="popUpMenu__color-list ">
				{ColorsArray.map((color, i) => (
					<div
						key={i}
						className={`popUpMenu__color rounded-circle ${"bg-" + color}
						bs-pink ${color === HeaderColor ? "popUpMenu__color--active" : ""}`}
						onClick={() => {
							handleChangeColor(color);
						}}
					/>
				))}
			</div>
			<div className="popUpMenu__icon-list ">
				{IconsArray.map((icon, i) => (
					<div
						key={i}
						className={`popUpMenu__icon ${icon === HeaderIcon ? "popUpMenu__icon--active" : ""}`}
						onClick={() => {
							handleChangeIcon(icon);
						}}
					>
						<span className="material-icons">{icon}</span>
					</div>
				))}
			</div>
			<p>
				{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sequi eos laudantium eveniet repellat
					dicta temporibus vero impedit illum velit? */}
			</p>
		</div>
	);
};

export default PopUpMenu;
