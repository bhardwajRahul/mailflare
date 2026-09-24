import type { ColumnWidthPreference } from "./column-width-preferences-types";

function storageKey(userId: string, column: ColumnWidthPreference) {
	return `mailflare-column-width:${column}:${userId}`;
}

export function readColumnWidth(userId: string, column: ColumnWidthPreference, fallback: number, min: number, max: number) {
	try {
		const stored = localStorage.getItem(storageKey(userId, column));
		if (stored === null) return fallback;
		const width = Number(stored);
		return Number.isFinite(width) ? Math.max(min, Math.min(max, width)) : fallback;
	} catch {
		return fallback;
	}
}

export function saveColumnWidth(userId: string | null, column: ColumnWidthPreference, width: number) {
	if (!userId) return;
	try {
		localStorage.setItem(storageKey(userId, column), String(width));
	} catch {
		// Storage can be unavailable; resizing still works for this session.
	}
}
