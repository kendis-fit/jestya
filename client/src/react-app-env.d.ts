/// <reference types="react-scripts" />

declare module "bootstrap" {
	interface IModalOptions {
		backdrop?: boolean;
		keyboard?: boolean;
		focus?: boolean;
		show?: boolean;
	}

	class Modal {
		constructor(element: HTMLElement, options?: IModalOptions);
		show(): void;
		hide(): void;
	}
}
