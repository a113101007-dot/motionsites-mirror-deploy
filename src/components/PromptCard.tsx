import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { CatalogItem } from "../data/prompts.generated";
import { cardMotionStyle, resetCardPointer, updateCardPointer } from "../lib/cardMotion";
import { canLivePreview } from "../lib/catalog";
import { CopyButton } from "./CopyButton";
import { DownloadButton } from "./DownloadButton";
import { MediaFrame } from "./MediaFrame";
import { getCategoryLabel } from "../i18n/zh-CN";

export function PromptCard({ item, onPreview }: { item: CatalogItem; onPreview: (item: CatalogItem) => void }) {
  const livePreview = canLivePreview(item);

  return (
    <article
      className="motion-card group relative isolate overflow-hidden rounded-[16px] bg-[#262626]"
      style={cardMotionStyle}
      onPointerMove={updateCardPointer}
      onPointerLeave={resetCardPointer}
    >
      <div className="motion-card-sheen" aria-hidden="true" />
      <button
        type="button"
        onClick={() => onPreview(item)}
        className="relative z-10 block w-full text-left"
        aria-label={`预览 ${item.title}`}
      >
        <MediaFrame item={item} className="aspect-[1.58/1] w-full rounded-b-[10px] rounded-t-[16px]" compact />
      </button>
      <div className="relative z-20 space-y-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-lg font-bold leading-6 tracking-[-0.03em] text-[#f5f5f5]">
              {item.title}
            </p>
            <p className="mt-1 truncate text-sm font-medium text-[#ababab]">{getCategoryLabel(item.category)}</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-2">
            <CopyButton text={item.prompt} label="复制" />
            <DownloadButton text={item.prompt} filename={`${item.slug}.md`} label="下载" />
          </div>
          {livePreview ? (
            <Link
              to={`/preview/${item.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-white px-3 text-sm font-bold text-[#171717] transition-transform hover:-translate-y-0.5"
            >
              在线预览
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => onPreview(item)}
            className="grid h-10 w-10 place-items-center rounded-xl bg-[#303030] text-[#ababab] transition-colors hover:bg-[#3a3a3a] hover:text-white"
            aria-label={`打开 ${item.title} 的预览`}
          >
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
