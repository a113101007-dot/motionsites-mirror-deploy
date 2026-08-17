import { categoryLabels } from "../src/i18n/zh-CN";
import { normalizeSearchQuery, resolveCategoryAlias, searchCatalog } from "../src/lib/search";
import { catalogItems } from "../src/data/prompts.generated";

describe("Chinese catalogue search", () => {
  it("normalizes full-width text and whitespace", () => {
    expect(normalizeSearchQuery("　ＳａａＳ　")).toBe("saas");
    expect(normalizeSearchQuery("   ")).toBe("");
  });

  it("maps Chinese category aliases to stable English values", () => {
    expect(resolveCategoryAlias("定价")).toBe("Pricing");
    expect(resolveCategoryAlias("落地页")).toBe("Landing Pages");
    expect(resolveCategoryAlias("页脚")).toBe("Footers");
  });

  it("filters by canonical category while preserving English prompt data", () => {
    const results = searchCatalog(catalogItems, "", "Pricing");
    expect(results).toHaveLength(10);
    expect(results.every((item) => item.category === "Pricing")).toBe(true);
    expect(results.every((item) => !/[一-鿿]/u.test(item.prompt.slice(0, 100)))).toBe(true);
  });

  it("supports Chinese aliases and English keywords", () => {
    expect(searchCatalog(catalogItems, "定价").every((item) => item.category === "Pricing")).toBe(true);
    expect(searchCatalog(catalogItems, "HorizonX").length).toBeGreaterThan(0);
  });

  it("covers every generated catalogue category", () => {
    const categories = new Set(catalogItems.map((item) => item.category));
    for (const category of categories) expect(categoryLabels[category]).toBeTruthy();
  });
});
