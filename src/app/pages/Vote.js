import { useEffect } from 'react';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { scrollToTopNow } from '../component/ScrollToTop';
import { Reveal, GlassPanel, PageHero } from '../component/Section';
import { tokens, mono } from 'theme';

const VOTE_ADDRESS = 'c2QVMZKC1KyQq84VVQc32sniKQhB6e';

function Block ({ title, children }) {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography
        variant='h5'
        sx={{ fontSize: { xs: '1.25rem', md: '1.45rem' }, mb: 1.75, color: tokens.text }}
      >{title}
      </Typography>
      {children}
    </Box>
  );
}

function Body ({ children, sx }) {
  return (
    <Typography
      sx={{ color: tokens.textDim, lineHeight: 1.78, mb: 2, fontSize: '1rem', ...sx }}
    >{children}
    </Typography>
  );
}

function Bullets ({ items }) {
  return (
    <Box component='ul' sx={{ pl: 0, m: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <Box
          component='li' key={i}
          sx={{
            position: 'relative',
            pl: 3.25,
            mb: 1.75,
            color: tokens.textDim,
            lineHeight: 1.75,
            '&:before': {
              content: '""',
              position: 'absolute',
              left: 4,
              top: '0.62em',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: tokens.brand
            }
          }}
        >{item}
        </Box>
      ))}
    </Box>
  );
}

function Callout ({ children, label }) {
  return (
    <Box
      sx={{
        my: 3,
        p: 2.5,
        borderRadius: '14px',
        border: `1px solid rgba(21,220,150,0.42)`,
        background: 'rgba(21,220,150,0.08)',
        textAlign: 'center'
      }}
    >
      {label && (
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.6875rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: tokens.textFaint,
            mb: 1
          }}
        >{label}
        </Typography>
      )}
      <Typography
        sx={{
          fontFamily: mono,
          fontSize: { xs: '0.85rem', md: '1rem' },
          color: tokens.text,
          wordBreak: 'break-all',
          lineHeight: 1.6
        }}
      >{children}
      </Typography>
    </Box>
  );
}

export default function Vote () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageHero title='PoW-PoS On-Chain Vote' lede="After years of community discussion, the Core Contributor Team asked holders to choose the future of the Mochimo network's consensus algorithm. The network now runs on proof of stake." />

      <Reveal delay={80}>
        <GlassPanel sx={{ p: { xs: 3, md: 5 }, maxWidth: 820 }}>
          <Body>
            To ensure all community members had a fair opportunity to
            participate, the PoW-PoS on-chain voting window was extended by
            one week.
          </Body>
          <Body sx={{ mb: 0 }}>
            To prevent last-minute attempts to force an outcome without
            sufficient response time, voting close was determined by an
            objective on-chain event instead of a fixed second on the clock.
          </Body>

          <Block title='Voting Window Extension'>
            <Body sx={{ mb: 0 }}>
              Voting remained open through May 7, 2026, and transitioned into a
              randomized close condition after 00:00:00 UTC on May 7, 2026.
            </Body>
          </Block>

          <Block title='How Voting Closed'>
            <Bullets
              items={[
                <>
                  The final valid voting block was the{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>
                    first block after May 7, 2026 00:00:00 UTC
                  </Box>{' '}
                  whose block hash began with binary{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>00000000</Box>{' '}
                  (shown in explorers as hash prefix{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>0x00</Box>).
                </>,
                <>
                  Because block hashes are unknown until a block is solved, each
                  block after that time had roughly a{' '}
                  <Box component='strong' sx={{ color: tokens.text }}>1/256</Box>{' '}
                  chance of being the terminal voting block.
                </>,
                <>
                  This meant the close could occur immediately, or only after
                  additional blocks had been mined, creating a buffer for
                  community response instead of a single predictable cutoff
                  moment.
                </>
              ]}
            />
          </Block>

          <Block title='The Question'>
            <Body sx={{ mb: 0 }}>
              Voters were asked whether the Mochimo network should remain{' '}
              <Box component='strong' sx={{ color: tokens.text }}>PoW</Box>{' '}
              (Proof of Work, mined by GPU miners) or migrate to{' '}
              <Box component='strong' sx={{ color: tokens.text }}>PoS</Box>{' '}
              (Proof of Stake, where validator nodes confirm transactions and
              individual holders can stake their coins for staking rewards).
            </Body>
          </Block>

          <Block title='How Voting Worked'>
            <Body>
              Each person who wanted to vote sent a single transaction to the
              official MCM voting address:
            </Body>
            <Callout label='Official MCM Voting Address'>{VOTE_ADDRESS}</Callout>
            <Box sx={{ textAlign: 'center', my: 3 }}>
              <Button
                variant='contained'
                href='https://mochiscan.org/address/0x810b82c44efb657ad4cc7937578668b19e985e72'
                target='_blank' rel='noopener noreferrer'
                startIcon={<HowToVoteIcon />}
                endIcon={<OpenInNewIcon sx={{ fontSize: 16 }} />}
              >See the votes on Mochiscan
              </Button>
            </Box>
            <Callout label='Voting Close Trigger'>
              first post-2026-05-07 00:00:00 UTC block with hash prefix 0x00
            </Callout>
            <Body>
              Voters sent the smallest amount the network would accept which is{' '}
              <Box component='strong' sx={{ color: tokens.text }}>0.000000501 MCM</Box>,
              and added a memo field with either the word{' '}
              <Box
                component='strong'
                sx={{ fontFamily: mono, color: tokens.accent }}
              >POW
              </Box>{' '}or{' '}
              <Box
                component='strong'
                sx={{ fontFamily: mono, color: tokens.accent }}
              >POS
              </Box>{' '}in it.
            </Body>
            <Body sx={{ mb: 0 }}>
              The memo represented the network type the voter wanted to have in
              the future. If they wanted to migrate to PoS for example, they
              entered{' '}
              <Box component='strong' sx={{ fontFamily: mono, color: tokens.accent }}>POS</Box>{' '}
              in the memo field.
            </Body>
          </Block>

          <Block title='Voting Rules'>
            <Bullets
              items={[
                'Only the first vote transaction received from each address with a proper memo string included (either "POW" or "POS") counted.',
                "Voters were asked not to vote multiple times.",
                'To prevent any coin shuffling double-voting shenanigans, on May 1st we checked each address with either a POW or POS vote transaction.',
                'Whatever that address balance showed on May 1st was how many votes were credited to either PoS or PoW.'
              ]}
            />
          </Block>

          <Block title='Results'>
            <Body>
              Vote results were tabulated and presented on this page in early
              May. Mochimo now runs on proof of stake, and mining and proof of
              work are retired.
            </Body>
            <Body sx={{ mb: 0 }}>
              <Link component={RouterLink} to='/mining'>Read about proof of stake</Link>
            </Body>
          </Block>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}
