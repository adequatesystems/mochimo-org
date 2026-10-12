import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetChainQuery, useGetContributorsQuery } from 'api';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Tooltip,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import EmailIcon from '@mui/icons-material/Email';
import { keyframes } from '@emotion/react';

import { Section, Reveal, GlassPanel } from './component/Section';
import { tokens, fx, mono, display } from 'theme';
import { WebWallet, Github, social } from 'links';
import { BUY_MCM } from './component/Header';

const MAX_SUPPLY_FALLBACK = 76493180.0616804;

const innovations = [
  {
    id: 'crunch',
    icon: '/assets/icons/compress.png',
    title: 'ChainCrunch™ Compression',
    tag: 'Scalability',
    body: (
      <>
        With the size of many blockchains growing uncontrollably, and some
        already exceeding 1TB in size, scalability still remains a priority
        issue. Mochimo uses a proprietary compression algorithm called
        ChainCrunch™, which solves this issue without compromising on
        blockchain integrity.
        <br /><br />
        The core component used to verify the integrity of the Blockchain is a
        mere 50MB in size.
        A full node need only download an additional and tiny, compressed
        portion of the historical blockchain and begin contributing to the
        network immediately.
      </>
    )
  },
  {
    id: '3way',
    icon: '/assets/icons/handshake.png',
    title: 'Three-Way Handshake',
    tag: 'Protocol',
    body: (
      <>
        The Three-Way handshake is a network communication protocol requiring
        the collection of "acknowledgements" providing fast, simple and
        disposable security for secure requests to the decentralized network of
        nodes that make up the Mochimo Network.
      </>
    )
  },
  {
    id: 'tag',
    icon: '/assets/icons/tag.png',
    title: 'Quantum Resistant Addresses',
    tag: 'Cryptography',
    body: (
      <>
        Address size is one of the major hurdles with Quantum Resistant public
        keys. At 2208 bytes, it's more than a handful to remember or to share.
        Fortunately, Mochimo deploys a custom tagging feature that automatically
        generates an address from the very first quantum resistant public key
        ever used. This address will never change, even if the public keys
        change. This allows enormous public keys to be "tagged" with a short and
        easily memorable address of a mere 20 bytes in length. The official way
        of sharing these 20 bytes follows the Bitcoin standard of using base58,
        and including a crc16 checksum at the end.
      </>
    )
  },
  {
    id: 'pos',
    icon: '/assets/icons/decentralized.png',
    title: 'Proof of Stake',
    tag: 'Consensus',
    body: (
      <>
        Mochimo now runs on proof of stake. Mining and proof of work are
        retired. More resources about proof of stake are coming soon.
        <br /><br />
        WOTS+ signatures do not change. Post-quantum protection comes from how
        transactions are signed, not from the consensus mechanism.
      </>
    )
  }
];

function HeroBackdrop () {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        maskImage: {
          xs: 'radial-gradient(ellipse 90% 45% at 50% 72%, #000 0%, transparent 75%)',
          md: 'radial-gradient(ellipse 52% 62% at 76% 46%, #000 0%, transparent 72%)'
        },
        WebkitMaskImage: {
          xs: 'radial-gradient(ellipse 90% 45% at 50% 72%, #000 0%, transparent 75%)',
          md: 'radial-gradient(ellipse 52% 62% at 76% 46%, #000 0%, transparent 72%)'
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/images/brand-mark-tile.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: { xs: '56px 56px', md: '72px 72px' },
          backgroundPosition: 'center top',
          opacity: 0.09
        }}
      />
    </Box>
  );
}

const dialSweep = keyframes`
  from { transform: rotate(-300deg); opacity: 0; }
  15% { opacity: 1; }
  to { transform: rotate(0deg); opacity: 1; }
`;

const dialTurn = keyframes`
  from { transform: rotate(-40deg); }
  to { transform: rotate(0deg); }
`;

function HeroDial ({ height, maxSupply }) {
  const bracket = '1px solid rgba(21,220,150,.55)';
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === 'undefined' || !window.matchMedia) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    let frame = 0;
    let px = 0;
    let py = 0;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const nx = Math.max(-1, Math.min(1, (px - cx) / (window.innerWidth / 2)));
      const ny = Math.max(-1, Math.min(1, (py - cy) / (window.innerHeight / 2)));
      el.style.setProperty('--dial-x', nx.toFixed(3));
      el.style.setProperty('--dial-y', ny.toFixed(3));
    };
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const readouts = [
    { label: 'Signatures', value: 'WOTS+', accent: true, pos: 'tl' },
    { label: 'Consensus', value: 'PoS', accent: true, pos: 'tr' },
    { label: 'Max supply', value: `${Math.round(maxSupply).toLocaleString('en-US')} MCM`, pos: 'bl' },
    height
      ? { label: 'Block height', value: Number(height).toLocaleString('en-US'), accent: true, pos: 'br' }
      : { label: 'Genesis', value: '2018-06-25', pos: 'br' }
  ];

  const corners = {
    tl: { top: 0, left: 0, pt: 1.5, pl: 1.75, pr: 0, pb: 0, borderTop: bracket, borderLeft: bracket, textAlign: 'left' },
    tr: { top: 0, right: 0, pt: 1.5, pr: 1.75, pl: 0, pb: 0, borderTop: bracket, borderRight: bracket, textAlign: 'right' },
    bl: { bottom: 0, left: 0, pb: 1.5, pl: 1.75, pr: 0, pt: 0, borderBottom: bracket, borderLeft: bracket, textAlign: 'left' },
    br: { bottom: 0, right: 0, pb: 1.5, pr: 1.75, pl: 0, pt: 0, borderBottom: bracket, borderRight: bracket, textAlign: 'right' }
  };

  return (
    <Box
      ref={rootRef}
      sx={{
        '--dial-x': 0,
        '--dial-y': 0,
        position: 'relative',
        width: '100%',
        maxWidth: 520,
        mx: 'auto',
        '@media (min-width: 600px)': { aspectRatio: '1 / 1' }
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          '@media (min-width: 600px)': { position: 'absolute', inset: 0 }
        }}
      >
        <Box sx={{ position: 'absolute', inset: 0, transform: 'rotate(calc(var(--dial-x) * -6deg))', transition: 'transform 900ms cubic-bezier(.16,1,.3,1)' }}>
          <Box
            component='svg'
            viewBox='0 0 600 600'
            sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          >
            <circle cx='300' cy='300' r='268' fill='none' stroke='#2A3B41' strokeWidth='10' strokeDasharray='1.2 12.83' />
            <circle cx='300' cy='300' r='268' fill='none' stroke='#4E646B' strokeWidth='18' strokeDasharray='1.6 138.72' />
            <circle cx='300' cy='300' r='212' fill='none' stroke='#24343A' strokeWidth='1' />
            <line x1='300' y1='20' x2='300' y2='60' stroke='#33464C' strokeWidth='1' />
            <line x1='300' y1='540' x2='300' y2='580' stroke='#33464C' strokeWidth='1' />
            <line x1='20' y1='300' x2='60' y2='300' stroke='#33464C' strokeWidth='1' />
            <line x1='540' y1='300' x2='580' y2='300' stroke='#33464C' strokeWidth='1' />
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, transform: 'rotate(calc(var(--dial-x) * 12deg))', transition: 'transform 900ms cubic-bezier(.16,1,.3,1)' }}>
          <Box
            component='svg'
            viewBox='0 0 600 600'
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              overflow: 'visible',
              animation: `${dialTurn} 3.3s cubic-bezier(.22,.7,.2,1) 1 both`,
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
            }}
          >
            <circle cx='300' cy='300' r='296' fill='none' stroke={tokens.brand} strokeOpacity='0.4' strokeWidth='1.2' strokeDasharray='2 9' />
          </Box>
        </Box>
        <Box
          component='svg'
          viewBox='0 0 600 600'
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            animation: `${dialSweep} 3.3s cubic-bezier(.22,.7,.2,1) 1 both`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
          }}
        >
          <circle cx='300' cy='300' r='240' fill='none' stroke={tokens.brand} strokeWidth='2' strokeLinecap='round' strokeDasharray='190 1318' />
          <circle cx='469.7' cy='469.7' r='4' fill={tokens.brand} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            inset: '16.7%',
            borderRadius: '50%',
            bgcolor: tokens.raise,
            border: `1px solid ${tokens.line}`
          }}
        />
        <Box
          component='picture'
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '86.6%',
            transform: 'translate(calc(-50% + var(--dial-x) * 8px), calc(-50% + var(--dial-y) * 8px))',
            transition: 'transform 900ms cubic-bezier(.16,1,.3,1)',
            display: 'block',
            lineHeight: 0
          }}
        >
          <source srcSet='/assets/images/mark-static.webp' media='(prefers-reduced-motion: reduce)' />
          <Box component='img' src='/assets/images/mark-draw.webp' alt='' sx={{ width: '100%', height: 'auto', display: 'block' }} />
        </Box>
        {[
          { label: '000°', sx: { left: '50%', top: '9.5%', transform: 'translateX(-50%)' } },
          { label: '090°', sx: { right: '9%', top: '50%', transform: 'translateY(-50%)' } },
          { label: '180°', sx: { left: '50%', bottom: '9.5%', transform: 'translateX(-50%)' } },
          { label: '270°', sx: { left: '9%', top: '50%', transform: 'translateY(-50%)' } }
        ].map((deg) => (
          <Box
            key={deg.label}
            sx={{
              position: 'absolute',
              fontFamily: mono,
              fontSize: '10px',
              letterSpacing: '0.12em',
              color: '#5E7379',
              lineHeight: 1,
              ...deg.sx
            }}
          >{deg.label}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: { xs: 'grid', sm: 'contents' },
          gridTemplateColumns: '1fr 1fr',
          gap: 1.5,
          mt: 3
        }}
      >
        {readouts.map((item) => (
          <Box
            key={item.label}
            sx={{
              px: 1.5,
              py: 1.25,
              textAlign: 'left',
              border: `1px solid ${tokens.line}`,
              borderRadius: '10px',
              '@media (min-width: 600px)': {
                position: 'absolute',
                border: 'none',
                borderRadius: 0,
                ...corners[item.pos]
              }
            }}
          >
            <Typography
              component='p'
              sx={{
                fontFamily: mono,
                fontSize: '0.625rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: tokens.textFaint,
                lineHeight: 1.4
              }}
            >{item.label}
            </Typography>
            <Typography
              component='p'
              sx={{
                fontFamily: mono,
                fontSize: { xs: '0.8125rem', md: '0.8125rem' },
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: item.accent ? tokens.brand : tokens.text,
                lineHeight: 1.4,
                mt: 0.5,
                whiteSpace: 'nowrap'
              }}
            >{item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

function Hero ({ chain }) {
  const maxSupply = chain.data?.maxsupply || MAX_SUPPLY_FALLBACK;
  const height = chain.data?.bnum;

  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
        pt: { xs: '132px', md: '190px' },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden'
      }}
    >
      <HeroBackdrop />
      <Container maxWidth='lg'>
        <Grid container spacing={{ xs: 6, md: 4 }} alignItems='center'>
          <Grid item xs={12} md={7} sx={{ textAlign: 'left' }}>
            <Reveal delay={60}>
              <Typography
                variant='h1'
                sx={{
                  textAlign: 'left',
                  fontSize: { xs: '2.4rem', sm: '3rem', md: '2.75rem', lg: '3.4rem' },
                  lineHeight: 1.06,
                  letterSpacing: '-0.03em',
                  mt: 0,
                  mb: 2.5
                }}
              >
                The first <Box component='span' sx={{ color: tokens.brand, whiteSpace: 'nowrap' }}>post-quantum</Box> cryptocurrency.
              </Typography>
            </Reveal>

            <Reveal delay={120}>
              <Typography
                sx={{
                  color: tokens.textDim,
                  fontWeight: 300,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  lineHeight: 1.65,
                  maxWidth: 560,
                  textAlign: 'left',
                  mx: 0
                }}
              >
                Every transaction since the genesis block has been signed with WOTS+, a hash-based scheme Shor's algorithm can't break.
              </Typography>
            </Reveal>

            <Reveal delay={180}>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1.5,
                  justifyContent: 'flex-start',
                  mt: { xs: 4, md: 5 }
                }}
              >
                <Tooltip title={BUY_MCM.full}>
                  <Button
                    variant='contained' size='large'
                    href={BUY_MCM.href} target='_blank' rel='noopener noreferrer'
                    endIcon={<ArrowForwardIcon />}
                  >{BUY_MCM.label}
                  </Button>
                </Tooltip>
                <Button
                  variant='outlined' size='large'
                  href='/assets/files/mochimo_wp_EN.pdf'
                  target='_blank' rel='noopener noreferrer'
                  startIcon={<DescriptionIcon />}
                >Read the Whitepaper
                </Button>
              </Box>
            </Reveal>
          </Grid>

          <Grid item xs={12} md={5}>
            <Reveal delay={240}>
              <HeroDial height={height} maxSupply={maxSupply} />
            </Reveal>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const networks = [
  { name: 'Bitcoin', sig: 'ECDSA, secp256k1', basis: 'Elliptic-curve discrete log' },
  { name: 'Ethereum', sig: 'ECDSA, secp256k1', basis: 'Elliptic-curve discrete log' },
  { name: 'Solana', sig: 'Ed25519', basis: 'Elliptic-curve discrete log' },
  { name: 'Mochimo', sig: 'WOTS+', basis: 'Hash functions', safe: true }
];

function QuantumSection () {
  const gridColumns = { xs: 'minmax(0, 1fr) minmax(0, 0.85fr) 142px', md: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.3fr) 168px' };
  const headCell = {
    fontFamily: mono,
    fontSize: '0.625rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tokens.textFaint
  };

  return (
    <Box
      component='section'
      id='quantum'
      sx={{
        position: 'relative',
        bgcolor: tokens.raise,
        borderTop: '1px solid #24343A',
        borderBottom: '1px solid #24343A',
        py: { xs: 8, md: 14 }
      }}
    >
      <Container maxWidth='lg'>
        <Reveal>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '2rem', md: '2.75rem' },
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              maxWidth: '18ch',
              mt: 0,
              mb: 2.5
            }}
          >
            Most blockchains use signatures a quantum computer can break.
          </Typography>
          <Typography
            sx={{
              color: tokens.textDim,
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.0625rem' },
              lineHeight: 1.7,
              maxWidth: '62ch'
            }}
          >
            Bitcoin, Ethereum and Solana sign with elliptic curves, which Shor's algorithm breaks on a large enough quantum computer. Mochimo has signed with hash-based WOTS+ since its first block.
          </Typography>
        </Reveal>

        <Reveal delay={100}>
          <Box
            role='table'
            aria-label='Signature schemes by network'
            sx={{
              mt: { xs: 5, md: 7 },
              border: `1px solid ${tokens.line}`,
              borderRadius: '20px',
              overflow: 'hidden',
              bgcolor: tokens.base
            }}
          >
            <Box
              role='row'
              sx={{
                display: 'grid',
                gridTemplateColumns: gridColumns,
                columnGap: { xs: 1.5, md: 2 },
                alignItems: 'center',
                px: { xs: 2, md: 3 },
                py: 1.75
              }}
            >
              <Typography role='columnheader' sx={headCell}>Network</Typography>
              <Typography role='columnheader' sx={headCell}>Signature</Typography>
              <Typography role='columnheader' sx={{ ...headCell, display: { xs: 'none', md: 'block' } }}>Signature security rests on</Typography>
              <Typography role='columnheader' sx={{ ...headCell, textAlign: 'right' }}>Quantum status</Typography>
            </Box>

            {networks.map((net) => (
              <Box
                key={net.name}
                role='row'
                sx={{
                  display: 'grid',
                  gridTemplateColumns: gridColumns,
                  columnGap: { xs: 1.5, md: 2 },
                  alignItems: 'center',
                  px: { xs: 2, md: 3 },
                  py: { xs: 2, md: 2.25 },
                  borderTop: `1px solid ${tokens.line}`,
                  bgcolor: net.safe ? 'rgba(21,220,150,0.06)' : 'transparent'
                }}
              >
                <Box role='cell' sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, overflow: 'hidden' }}>
                  {net.safe && (
                    <Box component='img' src='/assets/images/brand-mark.svg' alt='' width={18} height={18} sx={{ display: { xs: 'none', sm: 'block' } }} />
                  )}
                  <Typography
                    sx={{
                      fontFamily: display,
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      color: net.safe ? tokens.brand : tokens.text
                    }}
                  >{net.name}
                  </Typography>
                </Box>
                <Box
                  role='cell'
                  sx={{
                    fontFamily: mono,
                    fontSize: { xs: '0.75rem', md: '0.8125rem' },
                    color: tokens.textDim
                  }}
                >{net.sig}
                </Box>
                <Box
                  role='cell'
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    fontSize: '0.875rem',
                    color: tokens.textDim
                  }}
                >{net.basis}
                </Box>
                <Box role='cell' sx={{ justifySelf: 'end' }}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      px: 1.25,
                      py: 0.5,
                      borderRadius: 999,
                      fontFamily: mono,
                      fontSize: { xs: '0.5625rem', md: '0.625rem' },
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      ...(net.safe
                        ? { bgcolor: tokens.brand, color: tokens.base }
                        : { border: `1px solid ${tokens.lineStrong}`, color: tokens.textDim })
                    }}
                  >{net.safe ? 'Resistant since 2018' : 'Breakable by Shor'}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>

          <Typography sx={{ mt: 2, fontSize: '0.8125rem', color: tokens.textFaint }}>
            WOTS+ is the one-time signature inside SLH-DSA, which NIST standardized as FIPS 205 in 2024.
          </Typography>
        </Reveal>
      </Container>
    </Box>
  );
}

function BentoTile ({ href, to, external, sx, children }) {
  return (
    <Box
      component={to ? RouterLink : 'a'}
      to={to}
      href={href}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'inherit',
        bgcolor: tokens.raise,
        border: `1px solid ${tokens.line}`,
        borderRadius: '20px',
        transition: 'border-color .25s ease, transform .25s ease',
        '&:hover': {
          borderColor: 'rgba(21,220,150,.5)',
          transform: 'translateY(-2px)'
        },
        '&:focus-visible': {
          outline: `2px solid ${tokens.brand}`,
          outlineOffset: 2
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover': { transform: 'none' }
        },
        ...sx
      }}
    >
      {external && (
        <NorthEastIcon
          sx={{ position: 'absolute', top: 20, right: 20, fontSize: 18, color: tokens.textFaint, zIndex: 1 }}
        />
      )}
      {children}
    </Box>
  );
}

function ExploreSection () {
  return (
    <Section id='explore'>
      <Reveal>
        <Typography
          variant='h2'
          sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.1, letterSpacing: '-0.025em', mb: { xs: 4, md: 6 } }}
        >Hold and explore MCM.
        </Typography>
      </Reveal>
      <Reveal delay={80}>
        <Box
          sx={{
            display: 'grid',
            gap: 2.5,
            gridTemplateColumns: { xs: '1fr', md: '1.35fr 1fr 1fr' },
            gridTemplateRows: { md: 'auto auto' }
          }}
        >
          <BentoTile href={WebWallet.href} external sx={{ gridColumn: { md: '1 / 2' }, gridRow: { md: '1 / 3' } }}>
            <Box
              component='img'
              src='/assets/images/wallet-phone.webp'
              alt='The Mochimo app on a phone'
              loading='lazy'
              sx={{
                width: '100%',
                height: { xs: 240, md: 360 },
                objectFit: 'cover',
                objectPosition: 'center 45%',
                display: 'block',
                borderBottom: `1px solid ${tokens.line}`
              }}
            />
            <Box sx={{ p: { xs: 3, md: 3.5 }, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
              <Typography
                sx={{
                  fontFamily: display,
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.35rem' },
                  color: tokens.text
                }}
              >Mochimo Wallet
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.65, color: tokens.textDim, mt: 1 }}>
                Hold and send MCM from a Chrome extension built for Mochimo's one-time WOTS+ keys.
              </Typography>
              <Typography
                sx={{ fontFamily: display, fontWeight: 600, fontSize: '0.875rem', color: tokens.brand, mt: 'auto', pt: 2.5 }}
              >Add to Chrome
              </Typography>
            </Box>
          </BentoTile>

          <BentoTile to='/mining' sx={{ gridColumn: { md: '2 / 4' }, gridRow: { md: '1 / 2' }, p: { xs: 3, md: 3.5 }, minHeight: { md: 260 } }}>
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'url(/assets/images/brand-mark-tile.svg)',
                backgroundSize: '64px 64px',
                opacity: 0.08,
                maskImage: 'linear-gradient(to left, #000, transparent 70%)',
                WebkitMaskImage: 'linear-gradient(to left, #000, transparent 70%)',
                pointerEvents: 'none'
              }}
            />
            <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: 440 }}>
              <Typography
                sx={{
                  fontFamily: display,
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.35rem' },
                  color: tokens.text
                }}
              >Proof of stake
              </Typography>
              <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.65, color: tokens.textDim, mt: 1 }}>
                Mochimo now runs on proof of stake. Mining and proof of work are retired, and more resources are coming soon.
              </Typography>
              <Typography
                sx={{ fontFamily: display, fontWeight: 600, fontSize: '0.875rem', color: tokens.brand, mt: 'auto', pt: 2.5 }}
              >Read about proof of stake
              </Typography>
            </Box>
          </BentoTile>

          <BentoTile href='https://mochiscan.org' external sx={{ p: { xs: 3, md: 3.5 }, minHeight: { md: 220 } }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: 'rgba(21,220,150,0.08)',
                color: tokens.brand,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2.5
              }}
            >
              <SearchIcon fontSize='small' />
            </Box>
            <Typography
              sx={{
                fontFamily: display,
                fontWeight: 600,
                fontSize: { xs: '1.2rem', md: '1.35rem' },
                color: tokens.text
              }}
            >Mochiscan
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.65, color: tokens.textDim, mt: 1 }}>
              Look up blocks, transactions and account balances.
            </Typography>
            <Typography
              sx={{ fontFamily: display, fontWeight: 600, fontSize: '0.875rem', color: tokens.brand, mt: 'auto', pt: 2.5 }}
            >Open the explorer
            </Typography>
          </BentoTile>

          <BentoTile to='/exchanges-mcm' sx={{ p: { xs: 3, md: 3.5 }, minHeight: { md: 220 } }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: '10px',
                bgcolor: 'rgba(21,220,150,0.08)',
                color: tokens.brand,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2.5
              }}
            >
              <StorefrontIcon fontSize='small' />
            </Box>
            <Typography
              sx={{
                fontFamily: display,
                fontWeight: 600,
                fontSize: { xs: '1.2rem', md: '1.35rem' },
                color: tokens.text
              }}
            >Where to buy MCM
            </Typography>
            <Typography sx={{ fontSize: '0.9375rem', lineHeight: 1.65, color: tokens.textDim, mt: 1 }}>
              Exchanges that list MCM, with links to each market.
            </Typography>
            <Typography
              sx={{ fontFamily: display, fontWeight: 600, fontSize: '0.875rem', color: tokens.brand, mt: 'auto', pt: 2.5 }}
            >See exchanges
            </Typography>
          </BentoTile>
        </Box>
      </Reveal>
    </Section>
  );
}

function WotsBand () {
  return (
    <Box component='section' id='faq' sx={{ position: 'relative', overflow: 'hidden', bgcolor: tokens.brand, color: tokens.base, py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <Box aria-hidden sx={{ position: 'absolute', inset: 0, backgroundImage: 'url(/assets/images/brand-mark-tile-dark.svg)', backgroundSize: { xs: '72px 72px', md: '96px 96px' }, backgroundPosition: 'center', opacity: 0.12, maskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 20%, #000 75%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 20%, #000 75%)', pointerEvents: 'none' }} />
      <Container maxWidth='md' sx={{ position: 'relative' }}>
        <Reveal>
          <Typography variant='h2' sx={{ fontFamily: display, fontWeight: 700, textTransform: 'uppercase', fontSize: { xs: '1.6rem', sm: '2.2rem', md: '3rem' }, lineHeight: 1.08, letterSpacing: '-0.01em', color: tokens.base, textAlign: 'center' }}>
            Signed with WOTS+ since block 0.
          </Typography>
          <Typography sx={{ mt: 2.5, mx: 'auto', maxWidth: '52ch', fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.7, color: 'rgba(23,33,36,0.8)', textAlign: 'center' }}>
            Mochimo has never produced a block without post-quantum signatures. The FAQ covers how WOTS+ works, the coin supply and proof of stake.
          </Typography>
          <Button component={RouterLink} to='/faq' variant='contained' size='large' endIcon={<ArrowForwardIcon />} sx={{ mt: { xs: 4, md: 5 }, bgcolor: tokens.base, color: tokens.text, '&:hover': { bgcolor: tokens.raise, color: tokens.brand } }}>
            Read the FAQ
          </Button>
        </Reveal>
      </Container>
    </Box>
  );
}

function CommunitySection ({ contributors }) {
  const communityLinks = [...social, Github, { href: 'mailto:support@mochimo.org', Icon: EmailIcon, primary: 'Email support' }];
  const handle = (href) => href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
  const label = (href) => {
    if (href.startsWith('mailto:')) return href.replace('mailto:', '');
    if (href.includes('youtube.com')) return 'YouTube channel';
    return handle(href);
  };

  return (
    <Section id='team'>
      <Grid container spacing={{ xs: 5, md: 6 }} alignItems='flex-start'>
        <Grid item xs={12} md={5}>
          <Reveal>
            <Typography
              variant='h2'
              sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '14ch', mb: 2.5 }}
            >Built by its community.
            </Typography>
            <Typography
              sx={{ color: tokens.textDim, fontWeight: 300, fontSize: { xs: '1rem', md: '1.0625rem' }, lineHeight: 1.7, maxWidth: '46ch' }}
            >
              Mochimo's core contributors include engineers from networking, AI, telecommunications and cryptography. Most stay anonymous.
            </Typography>

            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.625rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: tokens.textFaint,
                mt: 4,
                mb: 1.5
              }}
            >GitHub contributors
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
              <AvatarGroup
                max={10}
                sx={{ '& .MuiAvatar-root': { width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 } } }}
              >
                {contributors.data?.map((contrib) => (
                  <Tooltip key={contrib.login} title={contrib.login} placement='bottom'>
                    <Avatar
                      component='a'
                      alt={contrib.login}
                      src={contrib.avatar_url}
                      href={contrib.html_url}
                      target='_blank'
                      rel='noopener noreferrer'
                      sx={{ transition: 'transform 200ms ease', '&:hover': { transform: 'translateY(-4px)' } }}
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, mt: 4 }}>
              <Tooltip title="They're friendly">
                <Button
                  variant='outlined' to='/meet-the-team'
                  component={RouterLink} endIcon={<ArrowForwardIcon />}
                >Meet The Team
                </Button>
              </Tooltip>
            </Box>
          </Reveal>
        </Grid>
        <Grid item xs={12} md={7}>
          <Reveal delay={80}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
              {communityLinks.map(({ href, Icon, primary }) => (
                <Box
                  key={href}
                  component='a'
                  href={href}
                  {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.75,
                    minHeight: 64,
                    px: 2.25,
                    py: 1.5,
                    borderRadius: '14px',
                    border: `1px solid ${tokens.line}`,
                    bgcolor: tokens.raise,
                    color: 'inherit',
                    textDecoration: 'none',
                    transition: 'background-color .2s ease, border-color .2s ease',
                    '&:hover': { bgcolor: '#22333A', borderColor: 'rgba(21,220,150,.5)' },
                    '&:focus-visible': { outline: `2px solid ${tokens.brand}`, outlineOffset: 2 }
                  }}
                >
                  <Icon sx={{ color: tokens.brand, fontSize: 22, flexShrink: 0 }} />
                  <Box sx={{ minWidth: 0, flexGrow: 1, overflow: 'hidden' }}>
                    <Typography sx={{ fontFamily: display, fontWeight: 600, fontSize: '0.9375rem', color: tokens.text, lineHeight: 1.3 }}>{primary === 'Github' ? 'GitHub' : primary}</Typography>
                    <Typography noWrap sx={{ fontFamily: mono, fontSize: '0.6875rem', color: tokens.textFaint, lineHeight: 1.4 }}>{label(href)}</Typography>
                  </Box>
                  <NorthEastIcon sx={{ fontSize: 16, color: tokens.textFaint, flexShrink: 0 }} />
                </Box>
              ))}
            </Box>
          </Reveal>
        </Grid>
      </Grid>
    </Section>
  );
}

function HaikuPanel ({ chain }) {
  const lines = chain.data?.haiku?.split(' \n');
  return (
    <GlassPanel
      sx={{
        p: { xs: 3, md: 4 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'linear-gradient(160deg, rgba(21,220,150,0.08), rgba(255,255,255,0.015))'
      }}
    >
      <Box>
        <Box
          sx={{
            width: 52, height: 52, borderRadius: '10px', mb: 2.5,
            display: 'grid', placeItems: 'center',
            border: fx.hairline, background: 'rgba(21,220,150,0.08)'
          }}
        >
          <Box component='img' alt='' src='/assets/icons/poetry.png' sx={{ width: 28, height: 28 }} />
        </Box>
        <Typography variant='h6' sx={{ fontSize: '1.35rem', mb: 1.25 }}>
          Haiku of the Blockchain
        </Typography>
        <Typography sx={{ color: tokens.textDim, fontSize: '0.92rem', lineHeight: 1.7 }}>
          In the beginning, there was a single Haiku. Under proof of work, every
          block had to be solved with a nonce that came from a syntactically
          correct Haiku, so hundreds of thousands of them are now baked into the
          chain.
          <br /><br />
          With nearly 5 trillion possible combinations, Mochimo is a gold mine of
          poetry.
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 3,
          pt: 3,
          borderTop: fx.hairline,
          textAlign: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Redressed, cursive',
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            lineHeight: 1.45,
            color: tokens.text
          }}
        >
          {lines
            ? lines.map((line, i) => (
              <Box component='span' key={`haiku-${i}`} sx={{ display: 'block' }}>{line}</Box>
              ))
            : (
              <>
                <Box component='span' sx={{ display: 'block' }}>above day</Box>
                <Box component='span' sx={{ display: 'block' }}>a journey</Box>
                <Box component='span' sx={{ display: 'block' }}>walking</Box>
              </>
              )}
        </Typography>
        <Typography
          sx={{
            mt: 1.5,
            fontFamily: mono,
            fontSize: '0.625rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.textFaint
          }}
        >{lines ? 'Latest Block Haiku' : 'The Genesis Haiku'}
        </Typography>
      </Box>
    </GlassPanel>
  );
}

export default function Homepage () {
  const chain = useGetChainQuery();
  const contributors = useGetContributorsQuery({ owner: 'mochimodev', repo: 'mochimo' });
  const [active, setActive] = useState(false);
  const handleChange = (panel) => (_event, isActive) => setActive(isActive ? panel : false);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Hero chain={chain} />

      <QuantumSection />

      <Section id='innovations'>
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems='flex-start'>
          <Grid item xs={12} md={5}>
            <Reveal>
              <Typography
                variant='h3'
                sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, maxWidth: '14ch', mb: 2.5 }}
              >Innovations that set Mochimo apart
              </Typography>
              <Typography sx={{ color: tokens.textDim, lineHeight: 1.75, mb: 2 }}>
                The extensive history of updates and improvements to the Mochimo
                Cryptocurrency Engine is always accessible from Mochimo's&nbsp;
                <Tooltip title='Extensive History'>
                  <Link href='https://github.com/mochimodev/mochimo' target='_blank' rel='noopener noreferrer'>
                    GitHub repository
                  </Link>
                </Tooltip>.
              </Typography>
            </Reveal>
            <Reveal delay={120} sx={{ mt: 4, display: { xs: 'none', md: 'block' } }}>
              <HaikuPanel chain={chain} />
            </Reveal>
          </Grid>
          <Grid item xs={12} md={7}>
            <Reveal delay={80}>
              {innovations.map((item) => (
                <Accordion
                  key={item.id}
                  expanded={active === item.id}
                  onChange={handleChange(item.id)}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Box
                        component='img' alt='' src={item.icon}
                        sx={{ width: 30, height: 30, objectFit: 'contain', flexShrink: 0 }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            fontFamily: display,
                            fontWeight: 600,
                            fontSize: '1.02rem',
                            color: tokens.text,
                            lineHeight: 1.3
                          }}
                        >{item.title}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: mono,
                            fontSize: '0.625rem',
                            letterSpacing: '0.16em',
                            textTransform: 'uppercase',
                            color: tokens.textFaint
                          }}
                        >{item.tag}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>{item.body}</AccordionDetails>
                </Accordion>
              ))}
            </Reveal>
            <Reveal delay={120} sx={{ mt: 3, display: { xs: 'block', md: 'none' } }}>
              <HaikuPanel chain={chain} />
            </Reveal>
          </Grid>
        </Grid>
      </Section>

      <ExploreSection />

      <WotsBand />

      <CommunitySection contributors={contributors} />

    </Box>
  );
}
