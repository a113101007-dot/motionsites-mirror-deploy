import { ArrowRight, Rocket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { catalogItems, catalogSummary, type CatalogItem } from "../data/prompts.generated";
import { gradientPacks } from "../data/gradients";
import { getBackgroundItems, getFeaturedItems } from "../lib/catalog";
import { CopyButton } from "./CopyButton";
import { MediaFrame } from "./MediaFrame";
import { PromptGrid } from "./PromptGrid";
import { PromptModal } from "./PromptModal";
import { SectionHeader } from "./SectionHeader";

export function HomePage() {
  const [selected, setSelected] = useState<CatalogItem | null>(null);
  const featured = getFeaturedItems(catalogItems, 9);
  const horizonxItems = catalogItems.filter((i) => i.category === "HorizonX Library").slice(0, 6);
  const twentyFirstItems = catalogItems.filter((i) => i.category === "21st.dev Registry").slice(0, 6);
  const superdesignItems = catalogItems.filter((i) => i.category === "Superdesign Canvas").slice(0, 6);
  const backgrounds = getBackgroundItems(catalogItems, 6);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="scene-grid absolute inset-x-0 top-0 -z-10 h-[560px] opacity-45" />
        <div className="page-shell flex min-h-[430px] flex-col justify-center py-10 md:min-h-[500px]">
          <div className="mx-auto max-w-3xl text-center">
            <a
              href="https://designrocket.io/"
              className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#ababab] transition-colors hover:text-white"
            >
              由 <Rocket className="h-4 w-4 text-[#f97316]" aria-hidden="true" /> Design Rocket 提供支持
            </a>
            <h1 className="text-[clamp(2.4rem,5.1vw,4.7rem)] font-black leading-[1.08] tracking-[-0.035em] text-[#f5f5f5]">
              解锁你的 AI
              <span className="motion-hero-gradient block">网站设计超能力</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-base font-semibold leading-7 text-[#ababab]">
              直接复制经过整理的网站设计提示词，几分钟内生成精美落地页，无需注册，也没有付费门槛。
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/search"
                className="inline-flex h-14 items-center gap-2 rounded-full bg-gradient-to-b from-white to-[#dbeafe] px-8 text-lg font-black text-[#09090b] shadow-[0_16px_45px_rgba(219,234,254,0.16)] transition-transform hover:-translate-y-0.5"
              >
                搜索高质量提示词
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-sm font-medium text-[#ababab]">
            {catalogSummary.total} 条免费提示词 · {catalogSummary.media.video || 0} 个动态预览 · 无付费门槛
          </p>
        </div>
      </section>

      {/* HorizonX Dedicated Section */}
      {horizonxItems.length > 0 && (
        <section className="page-shell py-8 border-t border-blue-500/20">
          <SectionHeader
            eyebrow="HorizonX 精选"
            title="HorizonX 3D 与氛围编程提示词"
            copy="面向 v0、Lovable、Bolt 和 Cursor 的高级 React、WebGL 粒子首屏提示词。"
          />
          <PromptGrid items={horizonxItems} onPreview={setSelected} />
        </section>
      )}

      {/* 21st.dev Dedicated Section */}
      {twentyFirstItems.length > 0 && (
        <section className="page-shell py-8 border-t border-emerald-500/20">
          <SectionHeader
            eyebrow="21st.dev 组件库"
            title="21st.dev React 与 shadcn 组件提示词"
            copy="由社区设计工程师创作，包含 npx shadcn 安装入口的组件提示词。"
          />
          <PromptGrid items={twentyFirstItems} onPreview={setSelected} />
        </section>
      )}

      {/* Superdesign Dedicated Section */}
      {superdesignItems.length > 0 && (
        <section className="page-shell py-8 border-t border-purple-500/20">
          <SectionHeader
            eyebrow="Superdesign 画布"
            title="Superdesign AI 画布与动效提示词"
            copy="适用于 AI 产品设计智能体的无限画布、矢量变换和微交互提示词。"
          />
          <PromptGrid items={superdesignItems} onPreview={setSelected} />
        </section>
      )}

      <section className="page-shell py-5">
        <SectionHeader
          title="精选落地页提示词"
          copy="每张卡片都可以免费查看和复制。原始提示词与工作版重建提示词均可直接作为创作起点。"
        />
        <PromptGrid items={featured} onPreview={setSelected} />
      </section>

      <section className="page-shell py-12">
        <SectionHeader
          eyebrow="动态背景"
          title="可直接复制的媒体参考"
          copy="生成匹配的落地页时，可将预览 URL 用作视觉参考或快速背景输入。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {backgrounds.map((item) => (
            <article key={item.slug} className="overflow-hidden rounded-[20px] border border-[#353233] bg-[#232222]">
              <MediaFrame item={item} className="h-[260px]" label="预览" />
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-black uppercase tracking-[-0.02em]">{item.title}</h2>
                <CopyButton text={item.mediaUrl || item.posterUrl || item.prompt} label="复制 URL" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell py-12">
        <SectionHeader
          eyebrow="生产级渐变"
          title="玻璃质感渐变背景"
          copy="可直接用于页面区块、首屏背景和媒体空状态的 CSS 渐变。"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {gradientPacks.map((pack) => (
            <article key={pack.id} className="overflow-hidden rounded-[20px] border border-[#353233] bg-[#232222]">
              <div className="h-48" style={{ background: pack.css }} />
              <div className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-black uppercase leading-5 tracking-[-0.02em]">{pack.title}</h2>
                  <span className="rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white/62">
                    {pack.count}
                  </span>
                </div>
                <p className="min-h-[60px] text-sm leading-5 text-white/54">{pack.description}</p>
                <CopyButton text={`background: ${pack.css};`} label="复制 CSS" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <PromptModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
