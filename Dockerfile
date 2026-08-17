# syntax=docker/dockerfile:1.7
FROM node:22.21-alpine3.23 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

COPY index.html vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json ./
COPY tailwind.config.js postcss.config.js ./
COPY scripts ./scripts
COPY motionsites-prompts ./motionsites-prompts
COPY src ./src
COPY LICENSE DISCLAIMER.md FAIR_USE_NOTICE.md TERMS_OF_USE.md PRIVACY_POLICY.md DMCA.md SECURITY.md CODE_OF_CONDUCT.md ./

RUN npm run build \
    && test "$(node -e "console.log(require('./src/data/catalog-summary.json').total)")" = "661" \
    && mkdir -p dist/legal \
    && cp LICENSE DISCLAIMER.md FAIR_USE_NOTICE.md TERMS_OF_USE.md PRIVACY_POLICY.md DMCA.md SECURITY.md CODE_OF_CONDUCT.md dist/legal/

FROM nginxinc/nginx-unprivileged:1.29.4-alpine3.23

LABEL org.opencontainers.image.source="https://github.com/a113101007-dot/motionsites-mirror-deploy" \
      org.opencontainers.image.url="https://motionsites.phh6.com" \
      org.opencontainers.image.licenses="MIT" \
      org.opencontainers.image.title="MotionSites Prompt Collection Mirror" \
      org.opencontainers.image.description="Unofficial mirror of nomaan5541/motionsites-prompt-collection"

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/healthz >/dev/null || exit 1
