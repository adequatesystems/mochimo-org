# Agent guide: mochimo.org

The public website for Mochimo (MCM), published by The Mochimo Foundation. It is a Create React App project (`react-scripts` 5) on React 17, MUI 5 with Emotion, React Router 6 and Redux Toolkit, hosted on Cloudflare Pages.

## Agent resources

All agent resources live in `.agents/`. Most tools do not scan that folder, so follow these links.

| Path | What it holds | Read it when |
|---|---|---|
| [`.agents/context/PRODUCT.md`](.agents/context/PRODUCT.md) | Users, positioning, confirmed product facts, copy constraints | You change copy or add a claim |
| [`.agents/context/DESIGN.md`](.agents/context/DESIGN.md) | Design tokens, components, motion rules, do's and don'ts | You change anything visual |
| [`.agents/impeccable/design.json`](.agents/impeccable/design.json) | Generated design sidecar for the impeccable skill | You use impeccable. Regenerate it with `impeccable document` instead of editing it |
| [`.agents/agents/haiku-editor.md`](.agents/agents/haiku-editor.md) | Subagent that applies one small, specified change | You split a site edit into small steps |

Put new agent resources in `.agents/`, not at the repo root. Skills go in `.agents/skills/<name>/SKILL.md`.

Three tool constraints shape this layout:

- impeccable finds `PRODUCT.md` and `DESIGN.md` in `.agents/context/` on its own. It does not look directly in `.agents/`, so keep them in `context/`.
- impeccable hard-codes `.impeccable/` for its sidecar, config and runtime state. The root `.impeccable` entry is a symlink to `.agents/impeccable`, so keep it. `.agents/impeccable/.gitignore` keeps the runtime state out of git.
- Claude Code loads subagents only from `.claude/agents/`. Copy or symlink `haiku-editor.md` there to use it.

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Installs dependencies |
| `BROWSER=none npm start` | Runs the dev server on port 3000 |
| `npm run build` | Writes the production build to `build/` |
| `npm run start:prod` | Builds, then serves `build/` and the supply API from Express on port 3001 |
| `npm run audit` | Audits production dependencies |

There is no test suite. Check a change with `npm run build` and in the dev server. `Reveal` fades in content below the fold, and background browser tabs can delay it, so wait before you call a blank section a bug.

## Code map

- `src/App.js`: routes
- `src/theme.js`: design tokens and the MUI theme
- `src/app/homepage.js`: homepage sections
- `src/app/pages/`: FAQ, Mining (the Proof of Stake page, at `/mining`), Staking, Vote
- `src/app/other.js`: smaller pages, including the legal pages
- `src/app/component/`: Header, Footer, Section (`PageHero`, `Reveal`) and other shared parts
- `src/links.js`, `src/api.js`: external links and API clients
- `functions/supply/`: Cloudflare Pages Functions for the `/supply` endpoints
- `server/`: Express version of the same endpoints, used by `npm run server`

`jsconfig.json` sets `baseUrl` to `src`, so `import { tokens } from 'theme'` resolves to `src/theme.js`. Import the local helpers by relative path (`./util`), because a bare `util` resolves to the npm package. In MUI `sx`, put breakpoints inside a property, as in `fontSize: { xs: '1rem', md: '1.25rem' }`. MUI ignores a top-level `sm:` key.

## Content rules

`PRODUCT.md` has the full list. These are the ones that get broken most easily:

- Mochimo runs on proof of stake. Mining and proof of work are retired, so mention them only as history.
- Never call Mochimo open source.
- Show no node information: no hostnames, IPs, locations, counts, latency, peers or maps.
- Do not publish vote tallies or roadmap dates. Do not invent testimonials, audits, partners, user counts or press.
- The explorer is [mochiscan.org](https://mochiscan.org). `/explorer/*` redirects there, so do not build one into the site.
- Do not change routes, primary nav labels, legal copy or the logo without owner approval.
- Do not use em or en dashes in visible text or code comments.

`src/app/pages/Staking.js` is the source for staking facts. Do not add a staking fact that is not on the page without the owner's confirmation.

## Git

- `main` requires a pull request. Work on a branch and open a PR.
- Do not add AI attribution anywhere: no co-author trailers and no "generated with" lines in commits, PRs, code comments or docs.
- `.env` is tracked and the repo is public, so never put a secret in it.
