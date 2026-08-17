import type { CatalogItem } from "../data/prompts.generated";
import { categoryAliases, getCategoryLabel } from "../i18n/zh-CN";
import { similarity } from "./fuzzy";

export function normalizeSearchQuery(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase();
}

export function resolveCategoryAlias(value: string) {
  const normalized = normalizeSearchQuery(value);
  return categoryAliases[normalized] ?? null;
}

export function searchCatalog(items: readonly CatalogItem[], query: string, selectedCategory = "") {
  const normalizedQuery = normalizeSearchQuery(query);
  let result = selectedCategory ? items.filter((item) => item.category === selectedCategory) : [...items];

  if (!normalizedQuery) return result;
  const categoryAlias = resolveCategoryAlias(normalizedQuery);

  const scored = result.map((item) => {
    const fields = [
      item.title,
      item.prompt,
      item.category,
      item.originalCategory,
      item.pageType,
      ...(item.tags ?? []),
      getCategoryLabel(item.category),
    ]
      .filter(Boolean)
      .map((value) => normalizeSearchQuery(String(value)));

    if (categoryAlias && item.category === categoryAlias) return { item, score: 3 };
    if (fields.some((field) => field.includes(normalizedQuery))) return { item, score: 2 };

    return { item, score: similarity(normalizedQuery, normalizeSearchQuery(item.title)) };
  });

  return scored
    .filter(({ score }) => score > 0.3)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
