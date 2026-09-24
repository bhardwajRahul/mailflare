import { authFetch } from "@/lib/auth/client";

export async function fetchMessageSource(messageId: string, signal: AbortSignal): Promise<string> {
	const response = await authFetch(`/api/messages/${encodeURIComponent(messageId)}/original`, {
		signal,
		redirectOnUnauthorized: false,
	});
	const source = await response.text();
	if (!response.ok) throw new Error(source || "Unable to load original message");
	return source;
}
