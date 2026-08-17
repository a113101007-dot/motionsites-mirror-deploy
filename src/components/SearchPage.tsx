import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { catalogItems, type CatalogItem } from "../data/prompts.generated";
import { PromptGrid } from "./PromptGrid";
import { PromptModal } from "./PromptModal";
import { SectionHeader } from "./SectionHeader";
import { searchCategoryChips } from "../i18n/zh-CN";
import { searchCatalog } from "../lib/search";

const PAGE_SIZE = 24;

export function SearchPage() {
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => searchCatalog(catalogItems, query, selectedCategory),
    [query, selectedCategory],
  );

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <section className="page-shell py-10">
        <SectionHeader
          title="搜索高质量网站提示词"
          copy={`找到 ${filtered.length} 条提示词。无需注册，即可搜索、预览、复制和定制。提示词正文保留英文，支持中文分类词或英文关键词搜索。`}
        />

        <div className="mb-6 flex justify-center">
          <label className="flex h-12 w-full max-w-2xl items-center gap-3 rounded-full bg-[#202020] px-5 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
            <Search className="h-5 w-5 text-white/50" aria-hidden="true" />
            <span className="sr-only">搜索提示词</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="按名称、关键词或分类搜索，例如：定价、落地页、HorizonX、21st.dev…"
              className="w-full border-0 bg-transparent text-base text-white outline-none placeholder:text-white/40"
            />
          </label>
        </div>

        {/* Dedicated Section Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
          {searchCategoryChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              aria-pressed={selectedCategory === chip.category}
              onClick={() => {
                setSelectedCategory(chip.category);
                setPage(1);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                selectedCategory === chip.category
                  ? "bg-white text-black border-white shadow-md scale-105"
                  : "bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        <PromptGrid items={visible} onPreview={setSelected} />

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PageButton disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            上一页
          </PageButton>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-white/58">
            第 {page} 页，共 {pageCount} 页
          </span>
          <PageButton disabled={page === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
            下一页
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </PageButton>
        </div>
      </section>
      <PromptModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function PageButton({
  children,
  disabled,
  onClick,
}: {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-[12px] font-black uppercase tracking-[0.12em] text-white disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
    </button>
  );
}
