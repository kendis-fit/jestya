import React, { useState } from "react";
import Controller from "../Controller";
import { useAuth } from "../../../../context/auth";

interface IPopUpMenu {
	left: number | undefined;
	ColorsArray: string[];
	IconsArray: string[];
	HeaderColor: string;
	HeaderIcon: string;
	index: number;
	handleChangeColor(color: string): void;
	handleChangeIcon(icon: string): void;
	handleDeleteBoard(index: number): void;
}

const PopUpMenu = (props: IPopUpMenu) => {
	const { left = 0, ...controlerProps } = props;

	const [tab, setTab] = useState("description");

	const handleChangeTab = (event: React.MouseEvent<HTMLSpanElement>) => {
		setTab(event.currentTarget.id);
	};

	const { auth } = useAuth();

	const renderSwitch = (tab: string) => {
		switch (tab) {
			case "controller": {
				return <Controller {...controlerProps} />;
			}
			case "description": {
				return (
					<div className="popUpMenu__desription p-2">
						<textarea
							className="description__text form-control text-muted bg-white "
							cols={30}
							rows={10}
							disabled={auth.user?.role === "USER"}
							defaultValue={
								"Lorem, ipsum dolor. Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe architecto voluptate fugit eum debitis, sapiente pariatur harum nihil sequi?"
							}
						/>
					</div>
				);
			}

			default: {
				break;
			}
		}
	};

	return (
		<div
			className={`board-header__popUpMenu p-2 `}
			style={{ left: left - 140 < 100 ? 20 : left - 140 }}
		>
			<ul className="popUpMenu__nav nav nav-tabs">
				<li id="description" onClick={handleChangeTab} className="nav-item">
					<span className={`nav-link ${tab === "description" ? "active" : ""} `}>
						Description
					</span>
				</li>
				{auth.user?.role === "USER" ? null : (
					<li id="controller" onClick={handleChangeTab} className="nav-item">
						<span className={`nav-link ${tab === "controller" ? "active" : ""} `}>
							Controller
						</span>
					</li>
				)}
			</ul>
			{renderSwitch(tab)}
		</div>
	);
};

export default PopUpMenu;
