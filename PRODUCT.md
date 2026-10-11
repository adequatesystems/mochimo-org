# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: crypto holders evaluating quantum risk.** People who hold or are about to buy cryptocurrency and have started to ask what happens to their coins when quantum computers can break elliptic-curve signatures. They arrive skeptical, compare Mochimo against Bitcoin, Ethereum, Solana and newer post-quantum projects, and need to understand the risk and Mochimo's answer quickly, then reach a way to buy and store MCM. (Confirmed by the owner, 2026-10-11.)

**Secondary audiences, served after the holder path:**
- Node operators and former miners following the move from proof of work to proof of stake.
- Developers and contributors evaluating the protocol and the open-source code on GitHub.
- Community members following governance and the transition to proof of stake.

## Product Purpose

Mochimo (ticker MCM) is a cryptocurrency in which every address and transaction since the genesis block on June 25, 2018 has been signed with WOTS+, a hash-based one-time signature scheme that Shor's algorithm does not break. The network is moving from proof of work to proof of stake: mining and proof of work are deprecated, and full proof of stake is not live yet (owner, 2026-10-11). The website explains why that matters and routes visitors to buy MCM (Biconomy), store it (Mochimo Wallet Chrome extension), follow the move to proof of stake (the Proof of Stake page at /mining, with legacy miner downloads archived), explore the chain (Mochiscan), read the whitepaper, and contribute (GitHub, Discord).

Success: a holder understands the quantum risk and Mochimo's answer within the first screen and reaches a buy or store path without hunting.

## Positioning

**The first post-quantum cryptocurrency on mainnet, live since June 25, 2018.** (Confirmed as the core claim by the owner, 2026-10-11.)

The mechanism a neighbour cannot truthfully copy: WOTS+ has protected every address from block 0, with no signature migration and no legacy elliptic-curve keys on the chain, for more than eight years. Newer post-quantum chains launched years later; long-standing chains would need to migrate.

## Operating Context

- Publisher and copyright holder: **The Mochimo Foundation** (confirmed 2026-10-11). Adequate Systems, LLC is credited as the builder ("Built by" in the footer, /adq page) and is the operator named in the Mochimo Wallet Mobile terms and privacy policy.
- Site: React (Create React App, react-scripts 5) with MUI 5 and Emotion; fonts self-hosted via @fontsource; routes and primary nav labels (Explorer, Mining, FAQ, Whitepaper, Wallet, Buy MCM) are stable and must not change without approval.
- Live data comes from the MochiMap API (deu/sgp/usc-api.mochimap.com: chain, block, balance, richlist, transaction, network). As of 2026-10-11 these hosts do not resolve, so pages fall back to static values (max supply fallback, genesis date instead of live block height).
- Governance: an on-chain PoW/PoS vote closed after May 7, 2026; results were presented in early May. Owner instruction (2026-10-11): Mochimo is currently transitioning to proof of stake; mining and proof of work are deprecated; full proof of stake is not live yet. The site states this plainly and never gives a go-live date. Primary nav 'Mining' was renamed 'Proof of Stake' (route /mining unchanged) and 'Vote: PoW or PoS' was renamed 'PoS Vote' (owner-approved, 2026-10-11).

## Capabilities and Constraints

Confirmed product facts used on the site:
- Signatures: WOTS+ (hash-based, one-time). WOTS+ is the one-time signature inside SLH-DSA, which NIST standardized as FIPS 205 in 2024.
- Addresses: 2208-byte quantum public keys; a 20-byte tag gives an account a stable identity while the key changes on every spend.
- Consensus: moving from proof of work to proof of stake. Proof of work (the "Peach" algorithm, FPGA-tough, mined on consumer GPUs) is deprecated; under proof of stake, validator nodes will confirm transactions and holders will be able to stake MCM. Full proof of stake is not live yet.
- ChainCrunch: compression that lets a full node start from a small, compressed portion of history (the site states about 50MB for the core verification component).
- Pseudo-block failsafe (proof-of-work era): restored transaction clearing after a large loss of mining power. Not described as a current feature.
- Three-way handshake: lightweight network acknowledgement protocol.
- Haiku nonce (proof-of-work era): every block's nonce had to originate from a syntactically valid haiku.
- Supply: max supply 76,493,180 MCM (live value from the API when available); instamine 4,757,066 MCM split between the Foundation, the founder and the development team (see FAQ). 1 MCM = 1,000,000,000 nanoMCM.
- Genesis: June 25, 2018.

Constraints:
- Do not change routes, primary nav labels, legal copy (privacy policy, wallet terms) or the logo without owner approval.
- Do not publish a proof-of-stake go-live date, vote tallies or staking terms until the owner confirms them.

Open decisions and known inconsistencies (do not resolve by guessing):
- Naming drift: "Mojo" wallet vs "Mochimo Wallet"; "Peach" vs "Mochimo-Peach"; support@mochimo.org vs support@Mochimo.com.
- "Proprietary" ChainCrunch vs "open source" project wording.
- The Mochimo Foundation and Adequate Systems relationship is not described on the site.

## Brand Commitments

- Name **Mochimo**, ticker **MCM**, positioning line **Post-Quantum Currency** (part of the official lockup).
- Official assets and rules come from the Resources brandbook (Brand Guidelines 2025): primary colours mint #15DC96, slate #1D2A2E, white; secondary #10B078, #172124, #DDDDDD; Montserrat (primary) and Poppins (secondary). Logo misuse: no effects, rotation, stretching or blurring.
- Voice: plain, specific, dated and confident. Facts, mechanisms, numbers and dates carry the argument. The brandbook's campaign taglines and introduction prose are not used on the site. No em or en dashes in visible text.
- The site speaks as The Mochimo Foundation.

## Evidence on Hand

- Whitepaper PDF: public/assets/files/mochimo_wp_EN.pdf.
- Logos: public/assets/images/logo-lockup.svg, brand-mark.svg, brand-mark-tile.svg, brand-mark-tile-dark.svg; animated mark mark-draw.webp with still mark-static.webp (recoloured to #15DC96 on 2026-10-11; the logo kit source files use #00DCA4); Adequate Systems logo public/assets/source/adq-logo.svg.
- Photography: public/assets/images/wallet-phone.webp (brandbook mockup); team portraits public/assets/team/*.jpg (Matt Zweil, Terry Walters, Mark Baldwin, Jordan Reiser; "Emerson" is an AI team member).
- Brand source files: /Resources (brandbook.pdf, logo kit, animations, brand pattern, fonts, mockups) and the reference mockup Resources/Mochimo.org Redesign.html.
- Live data: MochiMap API (currently unreachable), GitHub contributors API, CoinGecko price.
- Exchange: Biconomy (MCM/USDT) is the only listed exchange.

Absent; never fabricate: testimonials, security audits or certifications, partner or customer logos, user, holder or hashrate counts, press coverage, patent numbers, roadmap dates, proof-of-stake go-live date or vote results, mobile wallet store links.

## Product Principles

1. **Proof over promise.** Every claim is backed by a mechanism, a number or a date the visitor can check. If it can't be shown, it isn't said.
2. **Since block zero.** The eight-year post-quantum record is the moat; history and dates lead, not futures.
3. **Holder path first.** Understand the risk, see Mochimo's answer, then buy and store, in that order and within reach on every page.
4. **Current or silent.** Time-bound statements carry a date or are removed; nothing on the site may go stale by itself.
5. **Open by default.** Code, contributors and governance are shown in the open and linked at the source.

## Accessibility & Inclusion

WCAG 2.2 AA contrast for all text, visible keyboard focus on every interactive element, and prefers-reduced-motion honoured (animations and parallax switch off, static assets replace animated ones).
