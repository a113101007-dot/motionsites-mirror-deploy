import { ExternalLink, Github, ShieldCheck } from "lucide-react";

const upstreamRepository = "https://github.com/nomaan5541/motionsites-prompt-collection";
const mirrorContact = "https://github.com/a113101007-dot";
const upstreamCommit = "2a8c639aff9007999afb4243db3e0fec28bb4a31";

export function MirrorNoticePage() {
  return (
    <section className="page-shell py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold tracking-[0.12em] text-violet-100">
          <ShieldCheck className="size-4" aria-hidden="true" />
          镜像说明
        </div>
        <h1 className="mt-6 text-4xl font-black leading-tight tracking-[-0.035em] text-white sm:text-6xl">
          这是一个独立运营的非官方镜像。
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/64 sm:text-lg">
          本站在 motionsites.phh6.com 提供 MotionSites Prompt Collection 的稳定浏览体验。本站与 MotionSites、上游作者及提示词中提到的任何品牌均无隶属、授权、维护或背书关系。
        </p>
        <p className="mt-4 max-w-3xl rounded-2xl border border-amber-300/15 bg-amber-300/[0.06] p-4 text-sm leading-7 text-amber-100/80">
          本页中文内容仅用于说明本镜像的运营事实。许可证、使用条款、隐私政策、免责声明及其他法律文件均以链接中的英文原文为准；如有不一致，以英文原文为准。
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <NoticeCard title="上游来源">
            <p>
              本应用及提示词目录基于上游提交 <code lang="en">{upstreamCommit.slice(0, 12)}</code>。原始版权声明和许可证已完整保留。
            </p>
            <ExternalLinkRow href={upstreamRepository} label="查看上游 GitHub 仓库" />
          </NoticeCard>
          <NoticeCard title="隐私与外部媒体">
            <p>
              本镜像未启用 Vercel Analytics，也没有添加替代的一方分析服务。提示词预览可能会直接加载第三方图片、视频、字体、页面框架或其他资源，这些服务可能获取你的 IP 地址、浏览器信息和来源站点。
            </p>
          </NoticeCard>
          <NoticeCard title="许可与第三方权利">
            <p>
              上游软件采用 MIT 许可证发布，但该许可证不会自动授予所有第三方图片、视频、商标、设计参考或外部托管资源的使用权。商业使用前，请自行核查上游条款和具体来源授权。
            </p>
            <ExternalLinkRow href="/legal/LICENSE" label="阅读 MIT 许可证英文原文" />
          </NoticeCard>
          <NoticeCard title="权利与下架联系">
            <p>
              如果你发现权利问题、归属错误，或需要提交下架请求，请通过下方 GitHub 主页联系镜像运营者，并提供受影响的页面地址和相关证明。
            </p>
            <ExternalLinkRow href={mirrorContact} label="通过 GitHub 联系镜像运营者" github />
          </NoticeCard>
        </div>
      </div>
    </section>
  );
}

function NoticeCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-sm leading-7 text-white/62">
      <h2 className="mb-4 text-lg font-black text-white">{title}</h2>
      {children}
    </article>
  );
}

function ExternalLinkRow({ href, label, github = false }: { href: string; label: string; github?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="mt-5 inline-flex items-center gap-2 font-bold text-violet-200 transition-colors hover:text-white"
    >
      {github ? <Github className="size-4" aria-hidden="true" /> : <ExternalLink className="size-4" aria-hidden="true" />}
      {label}
    </a>
  );
}
