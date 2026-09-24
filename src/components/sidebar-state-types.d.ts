import type { ReactNode } from "react";

export type SidebarState = {
	minimal: boolean;
	width: number;
	userId: string | null;
	toggle(): void;
	setWidth(width: number): void;
	setForcedMinimal(minimal: boolean): void;
};

export type SidebarProviderProps = {
	children: ReactNode;
	expandedWidth?: number;
};

export type SidebarHeaderProps = {
	href: string;
	label?: string;
};
