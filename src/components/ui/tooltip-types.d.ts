import type { ReactNode } from "react";

export type TooltipProps = {
	label: string;
	children: ReactNode;
	className?: string;
	placement?: "auto" | "right";
};

export type TooltipPosition = {
	left: number;
	top: number;
};
