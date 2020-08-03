import React, { useEffect, useRef } from "react";

interface IModalContainer {
	children: React.ReactNode;
	onClose(): void;
	isOpen: boolean;
}

const ModalContainer = (props: IModalContainer) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const handleClickOutside = (event: MouseEvent) => {
		console.log(event.target, wrapperRef.current);

		if (wrapperRef.current === event.target) {
			props.onClose();
			console.log("asdasdasd");
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef, props]);

	return (
		<div
			ref={wrapperRef}
			className="modal modal-container"
			style={props.isOpen ? { display: "block" } : { display: "none", width: "0px" }}
		>
			{/* <div className="modal-dialog"> */}
			{/* <div className="modal-content"> */}
			{props.children}
			{/* </div> */}
			{/* </div> */}
		</div>
	);
};

export default ModalContainer;
