# PUMPMAPS

Interactive memecoin world map prototype, built with Next.js and TypeScript.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Production check: `npm run build && npm start`.

## Deploy to Railway

Select **Deploy from GitHub Repo**, choose this repository, and let Railway detect the Node.js app. Build command: `npm run build`. Start command: `npm start`. Railway supplies `PORT`; Next.js accepts it automatically. Set a custom domain in Railway after deployment.

## Data and security

All token names, territory assignments, holders, market caps, volume, charts, rankings and battles are **illustrative demo data**, defined in `data/tokens.ts` and returned by `providers/data.ts`. They are not live market measurements. Do not use these figures for trading decisions. Replace the provider with a verified API before enabling live claims. Contract addresses and links are intentionally absent until verified. The optional wallet button requests connection from an installed Solana browser wallet; the site never requests a seed phrase or private key.
