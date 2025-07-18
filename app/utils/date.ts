import { format, isAfter, isFuture, isPast, parseISO } from "date-fns";
import { match, P } from "ts-pattern";

export const safeParseISO = (date?: string | null) => {
  if (!date) return null;

  try {
    return parseISO(date);
  } catch {
    return null;
  }
};

export const safeFormat = (date?: Date | null) => {
  if (!date) return null;

  try {
    return format(date, "MMMM dd, yyyy");
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

  if (typeof a === "string") aDate = safeParseISO(a);
  if (typeof b === "string") bDate = safeParseISO(b);

  if (!aDate && !bDate) return 0;
  if (!aDate) return 1;
  if (!bDate) return -1;

  return isAfter(aDate, bDate) ? -1 : 1;
};

type PublicationStatus = "unpublished" | "published" | "scheduled";

export const getPublicationStatus = (
  publishedAt: Date | string | null,
): PublicationStatus => {
  let cleanedPublishedAt = publishedAt;
  if (typeof publishedAt === "string")
    cleanedPublishedAt = safeParseISO(publishedAt);
  if (!cleanedPublishedAt) return "unpublished";
  if (isPast(cleanedPublishedAt)) return "published";
  if (isFuture(cleanedPublishedAt)) return "scheduled";
  return "unpublished";
};

export const getVisibiliy = ({
  isHidden,
  publicationStatus,
}: {
  isHidden: boolean;
  publicationStatus: PublicationStatus;
}) => {
  return match({ isHidden, publicationStatus })
    .with({ isHidden: true, publicationStatus: P.any }, () => "hidden")
    .with({ isHidden: false, publicationStatus: "unpublished" }, () => "hidden")
    .with({ isHidden: false, publicationStatus: "published" }, () => "live")
    .with(
      { isHidden: false, publicationStatus: "scheduled" },
      () => "scheduled",
    )
    .exhaustive();
};
