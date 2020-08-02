/// <reference types="react-scripts" />

declare module "bootstrap" {
	class Modal {
		constructor(element: HTMLElement);
		show(): void;
		hide(): void;
	}
}
