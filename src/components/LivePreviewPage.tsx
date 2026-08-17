import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { findCatalogItemBySlug } from "../lib/catalog";
import { CopyButton } from "./CopyButton";
import { PromptLiveRenderer } from "./PromptLiveRenderer";
import { getCategoryLabel } from "../i18n/zh-CN";

export function LivePreviewPage() {
  const { slug } = useParams();
  const item = findCatalogItemBySlug(slug);

  if (!item) {
    return (
      <PreviewMessage
        title="未找到预览"
        copy="该预览地址没有对应到本地目录中的提示词。"
      />
    );
  }

  const sourceLabel = item.sourceMode === "original" ? "原始来源" : "工作版重建";
  return (
    <section className="page-shell py-6">
      <div className="mb-5 flex flex-col gap-4 rounded-[24px] border border-white/10 bg-[#202020] p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Link to="/search" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white/58 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            返回提示词目录
          </Link>
          <h1 className="truncate text-2xl font-black tracking-[-0.05em] text-white sm:text-3xl">{item.title}</h1>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-white/46">
            {getCategoryLabel(item.category)} / {sourceLabel} / 在线预览
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={item.prompt} label="复制提示词" />
          {item.mediaUrl || item.posterUrl ? (
            <a
              href={item.mediaUrl || item.posterUrl || undefined}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#303030] px-4 text-sm font-semibold text-[#ababab] transition-colors hover:bg-[#3a3a3a] hover:text-white"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              打开媒体
            </a>
          ) : null}
        </div>
      </div>

      <PromptLiveRenderer item={item} />
    </section>
  );
}

function PreviewMessage({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="page-shell py-20">
      <div className="max-w-2xl rounded-[28px] border border-white/10 bg-[#202020] p-8">
        <Link to="/search" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/58 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          返回提示词目录
        </Link>
        <h1 className="text-4xl font-black tracking-[-0.06em]">{title}</h1>
        <p className="mt-4 leading-7 text-white/58">{copy}</p>
      </div>
    </section>
  );
}
