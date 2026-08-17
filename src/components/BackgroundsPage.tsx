import { useState } from "react";
import { catalogItems } from "../data/prompts.generated";
import { cardMotionStyle, resetCardPointer, updateCardPointer } from "../lib/cardMotion";
import { getBackgroundItems } from "../lib/catalog";
import { CopyButton } from "./CopyButton";
import { MediaFrame } from "./MediaFrame";
import { SectionHeader } from "./SectionHeader";
import { getCategoryLabel } from "../i18n/zh-CN";

export function BackgroundsPage() {
  const [showAll, setShowAll] = useState(false);
  const backgrounds = getBackgroundItems(catalogItems);
  const visible = showAll ? backgrounds : backgrounds.slice(0, 24);

  return (
    <section className="page-shell py-14">
      <SectionHeader
        eyebrow="动态背景"
        title="预览媒体参考"
        copy={`本地提示词档案中共有 ${backgrounds.length} 个公开媒体参考。你可以复制 URL，或在目录中打开对应提示词。`}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <article
            key={item.slug}
            className="motion-card group relative isolate overflow-hidden rounded-[20px] border border-[#353233] bg-[#232222] shadow-card"
            style={cardMotionStyle}
            onPointerMove={updateCardPointer}
            onPointerLeave={resetCardPointer}
          >
            <div className="motion-card-sheen" aria-hidden="true" />
            <MediaFrame item={item} className="h-[280px]" label={item.mediaType === "video" ? "动态预览" : "图片预览"} />
            <div className="relative z-20 space-y-4 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black uppercase leading-5 tracking-[-0.02em]">{item.title}</h2>
                  <p className="mt-1 text-xs font-semibold tracking-[0.08em] text-white/44">{getCategoryLabel(item.category)}</p>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-100">
                  免费
                </span>
              </div>
              <CopyButton text={item.mediaUrl || item.posterUrl || ""} label="复制 URL" />
            </div>
          </article>
        ))}
      </div>
      {!showAll && backgrounds.length > visible.length ? (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full bg-cta-gradient px-6 py-3 text-[12px] font-black uppercase tracking-[0.14em] text-white shadow-glow"
          >
            显示全部背景
          </button>
        </div>
      ) : null}
    </section>
  );
}
