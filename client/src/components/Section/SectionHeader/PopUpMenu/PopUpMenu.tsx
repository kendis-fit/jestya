import React, { useState } from "react";

interface IPopUpMenu {
	left: number | undefined;
	ShowPopUp?: boolean;
	ColorsArray: string[];
	IconsArray: string[];
	HeaderColor: string;
	HeaderIcon: string;
	index: number;
	handleChangeColor(color: string): void;
	handleChangeIcon(icon: string): void;
	handleDeleteSection(index: number): void;
}

const PopUpMenu = (props: IPopUpMenu) => {
	const {
		index,
		ColorsArray,
		HeaderColor,
		HeaderIcon,
		handleChangeColor,
		handleChangeIcon,
		handleDeleteSection,
		IconsArray,
		left = 0,
	} = props;

	const [tab, setTab] = useState("description");

	const handleChangeTab = (event: React.MouseEvent<HTMLSpanElement>) => {
		console.log(event.currentTarget.id);
		setTab(event.currentTarget.id);
	};

	const renderSwitch = (tab: string) => {
		switch (tab) {
			case "controle": {
				return (
					<div className="popUpMenu__controle">
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
						{index === 0 ? null : (
							<button
								className="btn btn-outline-danger w-85 align-self-center"
								onClick={() => handleDeleteSection(index)}
							>
								Delete Section
							</button>
						)}
					</div>
				);
			}
			case "description": {
				return (
					<div className="popUpMenu__desription">
						<textarea
							className="description__text form-control text-muted bg-white "
							cols={30}
							rows={10}
							disabled={false}
						>
							Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe
							architecto voluptate fugit eum debitis, sapiente pariatur harum nihil sequi?
						</textarea>
					</div>
				);
			}

			default: {
				break;
			}
		}
	};

	return (
		<div className={`section-header__popUpMenu p-2 `} style={{ left: left - 140 < 100 ? 20 : left - 140 }}>
			<ul className="popUpMenu__nav nav nav-tabs">
				<li id="description" onClick={handleChangeTab} className="nav-item">
					<span className={`nav-link ${tab === "description" ? "active" : ""} `}>Description</span>
				</li>
				<li id="controle" onClick={handleChangeTab} className="nav-item">
					<span className={`nav-link ${tab === "controle" ? "active" : ""} `}>Controle</span>
				</li>
			</ul>
			{renderSwitch(tab)}
		</div>
	);
};

export default PopUpMenu;
