import React from "react";

interface IController {
	ColorsArray: string[];
	IconsArray: string[];
	HeaderColor: string;
	HeaderIcon: string;
	id: string;
	handleChangeColor(color: string): void;
	handleChangeIcon(icon: string): void;
	handleDeleteBoard(id: string): void;
}

const Controller = (props: IController) => {
	const {
		id,
		ColorsArray,
		HeaderColor,
		HeaderIcon,
		handleChangeColor,
		handleChangeIcon,
		handleDeleteBoard,
		IconsArray,
	} = props;

	return (
		<div className="popUpMenu__controller ">
			<div className="popUpMenu__color-list  pt-2 mb-4">
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
			<div className="popUpMenu__icon-list mb-4">
				{IconsArray.map((icon, i) => (
					<div
						key={i}
						className={`popUpMenu__icon ${
							icon === HeaderIcon ? "popUpMenu__icon--active" : ""
						}`}
						onClick={() => {
							handleChangeIcon(icon);
						}}
					>
						<span className="material-icons">{icon}</span>
					</div>
				))}
			</div>
			<button
				className="btn btn-outline-danger w-85 align-self-center"
				onClick={() => handleDeleteBoard(id)}
			>
				Delete board
			</button>
		</div>
	);
};

export default Controller;
