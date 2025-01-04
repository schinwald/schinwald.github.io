import { format, isFuture, isPast, parseISO, isAfter } from "date-fns";

export const safeParseISO = (date: string) => {
	try {
		return parseISO(date);
	} catch {
		return null;
	}
};

export const safeFormat = (date?: Date | null) => {
	if (!date) return null;

	try {
		return format(date, "MMM dd, yyyy");
	} catch {
		return null;
	}
};

export const sortByRecentAscending = (
	a: Date | string | null,
	b: Date | string | null,
) => {
	let aDate = a;
	let bDate = b;

	console.log(aDate, bDate);

	if (typeof a === "string") aDate = safeParseISO(a as string);
	if (typeof b === "string") bDate = safeParseISO(b as string);

	if (!aDate && !bDate) return 0;
	if (!aDate) return 1;
	if (!bDate) return -1;

	return isAfter(aDate, bDate) ? -1 : 1;
};

export const extractPublicationStatus = (publishedAt: Date | null) => {
	if (!publishedAt) return "unpublished";
	if (isPast(publishedAt)) return "published";
	if (isFuture(publishedAt)) return "scheduled";
	return "unpublished";
};
