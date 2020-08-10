import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface IModalContainer {
	children: React.ReactNode;
	onClose(): void;
	isOpen: boolean;
}

const ModalContainer = (props: IModalContainer) => {
	const wrapperRef = useRef<HTMLDivElement>(null);
	const Body = document.body;

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current === event.target) {
				props.onClose();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [wrapperRef, props]);

	return ReactDOM.createPortal(
		<div
			ref={wrapperRef}
			className="modal modal-container"
			style={props.isOpen ? { display: "block" } : { display: "none", width: "0px" }}
		>
			{props.children}
		</div>,
		Body
	);
};

export default ModalContainer;
