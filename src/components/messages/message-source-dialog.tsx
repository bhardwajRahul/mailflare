"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { MessageSourceDialogProps } from "./message-source-dialog-types";
import { fetchMessageSource } from "./message-source-utils";

export function MessageSourceDialog({ messageId, open, onOpenChange }: MessageSourceDialogProps) {
	const [source, setSource] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!open) return;
		const controller = new AbortController();
		setSource(null);
		setError(null);
		setLoading(true);
		fetchMessageSource(messageId, controller.signal)
			.then((value) => {
				if (!controller.signal.aborted) setSource(value);
			})
			.catch((reason) => {
				if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : "Unable to load original message");
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});
		return () => controller.abort();
	}, [messageId, open]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="flex max-h-[90vh] w-[min(960px,calc(100vw-32px))] flex-col">
				<DialogHeader>
					<DialogTitle>Show original</DialogTitle>
					<DialogDescription>Full message source, including headers and MIME body.</DialogDescription>
				</DialogHeader>
				{loading && <div className="flex items-center gap-2 text-sm text-neutral-500"><LoaderCircle className="h-4 w-4 animate-spin" />Loading source…</div>}
				{error && <p className="text-sm text-neutral-600">{error}</p>}
				{source !== null && (
					<pre className="min-h-0 overflow-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 font-mono text-xs leading-relaxed text-neutral-900 whitespace-pre">{source}</pre>
				)}
			</DialogContent>
		</Dialog>
	);
}
