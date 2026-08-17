import { Menu, X, Github, Star, AlertTriangle, Search, CheckCircle, Info } from "lucide-react";
import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { catalogSummary } from "../data/prompts.generated";

const navItems = [
  { label: "6 个交互示例", to: "/examples", badge: "在线" },
  { label: "搜索提示词", to: "/search", badge: "推荐" },
  { label: "动态背景", to: "/backgrounds", badge: "免费" },
  { label: "渐变背景", to: "/gradients" },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showBottomBanner, setShowBottomBanner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup modal on initial session load
    const modalDismissed = sessionStorage.getItem("notice_modal_dismissed");
    if (!modalDismissed) {
      setShowNoticeModal(true);
    }
  }, []);

  const dismissModal = () => {
    setShowNoticeModal(false);
    sessionStorage.setItem("notice_modal_dismissed", "true");
  };

  return (
    <div className="relative min-h-screen overflow-x-clip pb-28 sm:pb-20">
      <header className="fixed left-0 right-0 top-0 z-40 bg-[#171717]/90 backdrop-blur-xl">
        <nav className="page-shell flex h-20 items-center justify-between gap-5">
          <NavLink to="/" className="flex items-center gap-3" aria-label="MotionSites 免费提示词库首页">
            <span className="motionsites-mark text-[34px] leading-none" aria-hidden="true">m</span>
            <span className="leading-none">
              <span className="block text-[22px] font-black lowercase tracking-[-0.05em]">motionsites</span>
              <span className="sr-only">Free Library</span>
            </span>
          </NavLink>

          <div className="hidden items-center gap-9 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isActive ? "text-white" : "text-[#ababab] hover:text-white"
                  }`
                }
              >
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="rounded-full border border-amber-200/70 px-1.5 py-px text-[8px] font-black uppercase leading-none text-amber-100">
                    {item.badge}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <span className="rounded-full border border-white/10 bg-[#202020] px-4 py-2 text-[12px] font-semibold text-[#d4d4d4]">
              {catalogSummary.total} 条免费提示词
            </span>
            <NavLink
              to="/search"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-[#171717] shadow-[0_12px_32px_rgba(219,234,254,0.12)] transition-transform hover:-translate-y-0.5"
            >
              搜索提示词
            </NavLink>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white lg:hidden"
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="打开导航菜单"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </header>

      {menuOpen ? (
        <div id="mobile-navigation" className="fixed inset-0 z-50 overflow-y-auto bg-[#171717]/96 backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true" aria-label="移动导航菜单">
          <div className="page-shell flex h-20 items-center justify-between">
            <span className="text-xl font-black lowercase tracking-[-0.05em]">motionsites</span>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.04] text-white"
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="关闭导航菜单"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="page-shell flex flex-col gap-3 pt-10">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl border border-white/10 bg-[#202020] px-5 py-5 text-2xl font-black tracking-[-0.04em] text-white"
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}

      <main className="pt-20">{children}</main>
      <Footer />

      {/* --- POPUP NOTICE MODAL --- */}
      {showNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="media-notice-title">
          <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/40 bg-[#161412] p-6 shadow-2xl text-white">
            <button
              onClick={dismissModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
              aria-label="关闭提示"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertTriangle className="size-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold">
                  重要提示
                </span>
                <h3 id="media-notice-title" className="text-xl font-bold leading-tight text-white">媒体预览状态</h3>
              </div>
            </div>

            <p className="mb-4 text-sm leading-relaxed text-gray-300">
              部分第三方图片或视频可能暂时无法加载。
              <strong className="font-semibold text-amber-300"> 不用担心，所有英文提示词正文仍可正常查看、复制和下载。</strong>
            </p>

            <div className="p-3.5 rounded-xl bg-black/50 border border-amber-500/20 text-xs text-gray-300 space-y-2 mb-6">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <CheckCircle className="size-4 shrink-0" />
                <span>所有提示词文本均可正常访问和复制。</span>
              </div>
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <Search className="size-4 shrink-0" />
                <span>可按中文分类词或英文名称、关键词搜索。</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                onClick={() => {
                  dismissModal();
                  navigate("/search");
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
              >
                立即搜索提示词
              </button>
              <button
                onClick={dismissModal}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/10"
              >
                知道了，关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- PERSISTENT BOTTOM NOTICE BANNER --- */}
      {showBottomBanner && (
        <aside
          aria-label="Site notice"
          className="fixed bottom-0 inset-x-0 z-40 border-t border-amber-500/30 bg-[#161412]/95 backdrop-blur-lg py-3 px-4 shadow-2xl"
        >
          <div className="page-shell flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="flex size-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                <Info className="size-4" />
              </span>
              <p className="text-gray-200">
                <strong className="font-semibold text-amber-400">提示：</strong>部分第三方媒体可能无法加载，
                <span className="font-semibold text-amber-300">但所有英文提示词均可正常使用。</span>
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <NavLink
                to="/search"
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-all shadow-md"
              >
                搜索提示词
              </NavLink>
              <button
                onClick={() => setShowBottomBanner(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white transition-colors"
                title="关闭提示条"
                aria-label="关闭提示条"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}

function Footer() {
  const legalItems = [
    { label: "镜像说明", to: "/mirror-notice" },
    { label: "使用条款（英文原文）", to: "/legal/TERMS_OF_USE.md", external: true },
    { label: "合理使用声明（英文原文）", to: "/legal/FAIR_USE_NOTICE.md", external: true },
    { label: "隐私政策（英文原文）", to: "/legal/PRIVACY_POLICY.md", external: true },
    { label: "MIT 许可证（英文原文）", to: "/legal/LICENSE", external: true },
    { label: "免责声明（英文原文）", to: "/legal/DISCLAIMER.md", external: true },
    { label: "DMCA 政策（英文原文）", to: "/legal/DMCA.md", external: true },
    { label: "行为准则（英文原文）", to: "/legal/CODE_OF_CONDUCT.md", external: true },
    { label: "安全说明（英文原文）", to: "/legal/SECURITY.md", external: true },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 py-12">
      <div className="page-shell grid gap-10 md:grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <span className="motionsites-mark text-[30px] leading-none" aria-hidden="true">m</span>
            <span className="text-xl font-black lowercase tracking-[-0.05em]">motionsites</span>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-white/52">
            免费的网站设计提示词目录。无需注册即可查看参考、复制英文提示词并快速创建落地页。
          </p>
          <p className="mt-4 max-w-md text-xs leading-5 text-violet-100/70">
            本站是由 motionsites.phh6.com 独立运营的非官方镜像，与 MotionSites 或上游作者无隶属或背书关系。外部预览会直接连接第三方媒体服务。
          </p>
          <NavLink to="/mirror-notice" className="mt-3 inline-flex text-xs font-bold text-violet-200 hover:text-white">
            阅读镜像与隐私说明
          </NavLink>
          <div className="mt-6">
            <a
              href="https://github.com/nomaan5541/motionsites-prompt-collection"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white"
            >
              <Github className="size-4" />
              <span>在 GitHub 查看上游项目</span>
              <Star className="size-4 text-amber-400" fill="currentColor" />
            </a>
          </div>
        </div>
        <FooterColumn title="法律与说明" items={legalItems} />
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; to: string; external?: boolean }[] }) {
  return (
    <div>
      <h2 className="text-xs font-black uppercase tracking-[0.18em] text-white/82">{title}</h2>
      <div className="mt-5 flex flex-col gap-3">
        {items.map((item) => (
          item.external ? (
            <a
              key={item.to}
              href={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/52 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ) : (
            <NavLink key={item.to} to={item.to} className="text-sm text-white/52 transition-colors hover:text-white">
              {item.label}
            </NavLink>
          )
        ))}
      </div>
    </div>
  );
}
