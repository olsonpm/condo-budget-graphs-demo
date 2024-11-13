## Condo Budget Graphs

[See it in action](https://olsonpm.github.io/condo-budget-graphs-demo/)

This is the demo version of a simple website I built to graphically represent
our condo's budget which is hidden away in excel spreadsheets.  The real version
requires authentication.

This was built very quickly.  It is disorganized - but it works and I am
happy with how it looks.

### To get it working locally

1. enable pnpm

```sh
# requires node v16.13+
$ corepack enable pnpm
```

2. run it

```sh
$ pnpm install --frozen-lockfile
$ pnpm dev
```

### How this works

This repo contains demo graph data, but the actual data is built using our
condo's budget spreadsheets.  The script to do this is
`./scripts/build-budget-and-graph-data/index.mjs`.  This script first reads
monthly expenses and annual budgets, then calculates running totals and finally
translates that into json compatible with [nivo](https://nivo.rocks/).
