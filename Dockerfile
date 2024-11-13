FROM node:22.11.0

COPY ./container /

WORKDIR /usr/lib/condo-budget-graphs

RUN corepack enable pnpm \
  && corepack prepare pnpm@9.12.3 --activate \
  && pnpm config set store-dir /root/pnpm-store \
  && corepack use pnpm@9.12.3

CMD pnpm -v \
  && pnpm install --prod --frozen-lockfile \
  && node dist/run.mjs
