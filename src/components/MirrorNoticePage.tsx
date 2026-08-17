import { ExternalLink, Github, ShieldCheck } from "lucide-react";

const upstreamRepository = "https://github.com/nomaan5541/motionsites-prompt-collection";
const mirrorContact = "https://github.com/a113101007-dot";
const upstreamCommit = "2a8c639aff9007999afb4243db3e0fec28bb4a31";

export function MirrorNoticePage() {
  return (
    <section className="page-shell py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
          <ShieldCheck className="size-4" aria-hidden="true" />
          Mirror notice
        </div>
        <h1 className="mt-6 text-4xl font-black tracking-[-0.05em] text-white sm:text-6xl">
          An independently operated, unofficial mirror.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-7 text-white/64 sm:text-lg">
          This site mirrors the open-source MotionSites Prompt Collection for reliable browsing at
          motionsites.phh6.com. It is not affiliated with, endorsed by, or maintained by MotionSites,
          the upstream author, or any brands referenced by the prompts.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <NoticeCard title="Upstream source">
            <p>
              The application and prompt catalogue are based on commit <code>{upstreamCommit.slice(0, 12)}</code> of
              the upstream repository. The original copyright and license notices are preserved.
            </p>
            <ExternalLinkRow href={upstreamRepository} label="View the upstream repository" />
          </NoticeCard>
          <NoticeCard title="Privacy and external media">
            <p>
              This mirror does not run Vercel Analytics or a replacement first-party analytics service. Prompt
              previews may load images, videos, fonts, frames, or other resources directly from third parties.
              Those providers can receive technical request data such as your IP address, browser information,
              and referrer.
            </p>
          </NoticeCard>
          <NoticeCard title="Licensing and third-party rights">
            <p>
              Upstream software is distributed under the MIT License. That license does not automatically grant
              rights to every third-party image, video, trademark, design reference, or externally hosted asset.
              Review the upstream terms and source-specific rights before commercial reuse.
            </p>
            <ExternalLinkRow href="/legal/LICENSE" label="Read the MIT License" />
          </NoticeCard>
          <NoticeCard title="Rights and takedown contact">
            <p>
              For a rights concern, inaccurate attribution, or takedown request related to this mirror, contact
              the mirror operator through the GitHub profile below and include the affected URL and supporting
              details.
            </p>
            <ExternalLinkRow href={mirrorContact} label="Contact the mirror operator on GitHub" github />
          </NoticeCard>
        </div>
      </div>
    </section>
  );
}

function NoticeCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 text-sm leading-6 text-white/62">
      <h2 className="mb-4 text-lg font-black tracking-[-0.03em] text-white">{title}</h2>
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
