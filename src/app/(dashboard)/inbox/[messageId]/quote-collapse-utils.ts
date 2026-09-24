export function collapseQuotedEmailHtml(html: string | null, preserveLeadingQuote = false): string | null {
	if (!html) return null;
	const document = new DOMParser().parseFromString(html, "text/html");

	for (const blockquote of Array.from(document.body.querySelectorAll("blockquote"))) {
		const introduction = blockquote.previousElementSibling;
		if (
			!(introduction instanceof HTMLElement) ||
			!/^On\b[\s\S]*\bwrote:\s*$/i.test(introduction.textContent?.trim() ?? "")
		) continue;
		if (
			preserveLeadingQuote &&
			introduction === document.body.firstElementChild &&
			blockquote === introduction.nextElementSibling
		) continue;

		const details = document.createElement("details");
		details.className = "email-quote-toggle";
		const summary = document.createElement("summary");
		summary.setAttribute("aria-label", "Toggle quoted email");
		summary.setAttribute("title", "Show or hide quoted email");
		const content = document.createElement("div");
		content.className = "email-quote-content";
		introduction.parentNode?.insertBefore(details, introduction);
		content.append(introduction, blockquote);
		details.append(summary, content);
	}

	return document.body.innerHTML;
}
