FROM node:22.20.0@sha256:915acd9e9b885ead0c620e27e37c81b74c226e0e1c8177f37a60217b6eabb0d7

COPY ./container /

WORKDIR /usr/lib/condo-budget-graphs

RUN corepack enable pnpm \
  && corepack prepare pnpm@10.17.1 --activate \
  && pnpm config set store-dir /root/pnpm-store

CMD pnpm -v \
  && pnpm install --prod --frozen-lockfile \
  && node dist/run.mjs
