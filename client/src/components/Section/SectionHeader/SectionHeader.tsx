import React, { useState } from "react";

const Colors = ["bg-primary", "bg-success", "bg-danger", "bg-warning", "bg-info"];

interface ISectionHeader {
	index: number;
	addSection: boolean;
	handleAddSection(index?: number | React.MouseEvent<HTMLButtonElement>): void;
}

const SectionHeader = (props: ISectionHeader) => {
	console.log(props);
	const [headerColor, setHeaderColor] = useState<string>(Colors[1]);

	const handleChangeColor = (color: string) => {
		setHeaderColor(color);
	};

	return (
		<div className={`section__header p-2 mb-3 d-flex ${props.addSection ? "border-bottom" : headerColor} `}>
			<div className="section-header__wrapperAddBtnLeft">
				{props.addSection ? null : ( //if not addSection show add button section before curent section
					<button
						className="section-header__addBtnLeft"
						onClick={() => {
							console.log("Clickkkkkkk");
							props.handleAddSection(props.index);
						}}
					>
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
					<span className="material-icons text-white p-2 pl-3 mr-2">build</span>
					<input
						className={` form-control w-65 ${headerColor}  border-0 section-header__title`}
						type="text"
						defaultValue={"asdasd"}
					/>
					<span className="section-header__arrow material-icons  ">keyboard_arrow_down</span>
				</>
			)}
			{props.addSection ? null : (
				<div className="section-header__popUpMenu p-2">
					<div className="d-flex w-100 justify-content-around">
						{Colors.map((ell, i) => (
							<div
								className={` rounded-circle ${ell}
						bs-pink`}
								style={{ height: "15px", width: "15px" }}
								onClick={() => {
									handleChangeColor(ell);
								}}
							/>
						))}
					</div>
					<p>
						{/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sequi eos laudantium eveniet repellat
					dicta temporibus vero impedit illum velit? */}
					</p>
				</div>
			)}
		</div>
	);
};

export default SectionHeader;
