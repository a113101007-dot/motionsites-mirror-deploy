# Upstream source

This private deployment repository packages an independently operated, unofficial mirror of:

- Repository: https://github.com/nomaan5541/motionsites-prompt-collection
- Baseline commit: `2a8c639aff9007999afb4243db3e0fec28bb4a31`
- Original copyright: Copyright (c) 2026 Nomaan Khan
- Software license: MIT

## Imported paths

The current upstream commit was audited to build the complete SPA from these paths only:

- `src/`
- `scripts/build-catalog.mjs`
- `motionsites-prompts/`
- package, Vite, TypeScript, Tailwind, and PostCSS configuration
- upstream license and policy documents

Large archive directories such as `assets/`, `demos/`, and `extractions/` are not build inputs at this commit. The live application continues to load the same third-party media URLs stored in the generated catalogue.

## Local mirror changes

- Vercel Analytics is removed and no replacement analytics service is added.
- A persistent unofficial-mirror disclosure and `/mirror-notice` page are added.
- Upstream legal files are copied into the runtime image under `/legal/`.
- Container, static-server, and GitHub Actions configuration is added.

Before updating the upstream baseline, re-audit build inputs, external media behavior, licenses and policies, dependencies, analytics, dynamic script execution, and excluded directory references. Updates require review and are never deployed automatically to the ECS host.
