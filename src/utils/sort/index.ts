import { Heading } from "@nectia-software/components.ui.tw-table";

/**
 * @description
 * Sorts the table the component.
 */
export function sort(field: string, headings: Heading[]): Heading[] {
  const sort = new Map<string, "DEFAULT" | "ASC" | "DESC">();

  sort.set("DEFAULT", "ASC");

  sort.set("ASC", "DESC");

  sort.set("DESC", "DEFAULT");

  const fallback = headings.map((h) => {
    if (field === h.title && h.sort) {
      return {
        ...h,
        sort: sort.get(h.sort),
      };
    }

    return Object.assign(h, {
      sort: "DEFAULT",
    });
  });

  return fallback;
}