/// <reference types="react-scripts" />

declare module "bootstrap" {
	class Modal {
		constructor(element: HTMLElement);
		show(): void;
		hide(): void;
		dispose(): void;
	}
}

declare module NodeJS {
	interface ProcessEnv {
		REACT_APP_API: string;
	}
}
