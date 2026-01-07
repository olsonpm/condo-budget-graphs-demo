## Condo Budget Graphs

[See it in action](https://olsonpm.github.io/condo-budget-graphs-demo/)

### What Is It?

The demo version of my condo budget website. I generate demo data to show its
various features. The real version parses data from excel spreadsheets and
requires authentication.

I built the initial draft in a hurry, so the code isn't the prettiest. Over
time, I've built out more features and am proud of where it's at today.

### Why build it?

I'm the treasurer at my condo and wanted a way to both easily view and convey
the data to residents.

### To get it working locally

1. enable pnpm

```sh
$ corepack enable pnpm
```

2. run it

```sh
$ pnpm install --frozen-lockfile
$ pnpm prep-demo
$ pnpm dev
```
