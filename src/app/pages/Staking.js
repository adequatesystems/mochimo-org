import { useEffect } from 'react';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { scrollToTopNow } from '../component/ScrollToTop';
import { Reveal, GlassPanel, PageHero } from '../component/Section';
import { tokens, mono } from 'theme';

const TAWARA_RELEASES = 'https://github.com/adequatelimited/Tawara-wallet/releases/latest';
const TAWARA_MOBILE_RELEASES = 'https://github.com/adequatelimited/Tawara-mobile/releases/latest';

const tiers = [
  { tier: 0, lock: 'about 45 days', blocks: '65,536', weight: '1x' },
  { tier: 1, lock: 'about 3 months', blocks: '131,072', weight: '2x' },
  { tier: 2, lock: 'about 6 months', blocks: '262,144', weight: '3x' },
  { tier: 3, lock: 'about 1 year', blocks: '524,288', weight: '4x' },
  { tier: 4, lock: 'about 2 years', blocks: '1,048,576', weight: '5x' },
  { tier: 5, lock: 'about 4 years', blocks: '2,097,152', weight: '6x' }
];

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

function Strong ({ children }) {
  return <Box component='strong' sx={{ color: tokens.text }}>{children}</Box>;
}

function Bullets ({ items, numbered = false }) {
  return (
    <Box component={numbered ? 'ol' : 'ul'} sx={{ pl: 0, m: 0, listStyle: 'none', counterReset: 'step' }}>
      {items.map((item, i) => (
        <Box
          component='li' key={i}
          sx={{
            position: 'relative',
            pl: numbered ? 4.5 : 3.25,
            mb: 1.75,
            color: tokens.textDim,
            lineHeight: 1.75,
            counterIncrement: 'step',
            '&:before': numbered
              ? {
                  content: 'counter(step)',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  border: `1px solid ${tokens.brand}`,
                  color: tokens.brand,
                  fontFamily: mono,
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              : {
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

function TierTable () {
  const cell = { py: 1.25, px: 1.5, borderBottom: `1px solid ${tokens.line}`, textAlign: 'left' };
  return (
    <Box sx={{ overflowX: 'auto', my: 2 }}>
      <Box component='table' sx={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', color: tokens.textDim }}>
        <Box component='thead'>
          <Box component='tr'>
            {['Tier', 'Locked for', 'Blocks (at least)', 'Stake weight'].map(h => (
              <Box component='th' key={h} sx={{ ...cell, color: tokens.text, fontWeight: 600 }}>{h}</Box>
            ))}
          </Box>
        </Box>
        <Box component='tbody'>
          {tiers.map(t => (
            <Box component='tr' key={t.tier}>
              <Box component='td' sx={{ ...cell, fontFamily: mono }}>{t.tier}</Box>
              <Box component='td' sx={cell}>{t.lock}</Box>
              <Box component='td' sx={{ ...cell, fontFamily: mono }}>{t.blocks}</Box>
              <Box component='td' sx={{ ...cell, fontFamily: mono, color: tokens.text }}>{t.weight}</Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function Staking () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageHero
        title='Staking MCM'
        lede='Lock MCM for a period you choose and earn a share of every block reward. Staking is built into the Mochimo protocol and works directly from the Tawara wallet.'
      />

      <Reveal delay={80}>
        <GlassPanel sx={{ p: { xs: 3, md: 5 }, maxWidth: 860 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 1 }}>
            <Button
              variant='contained' startIcon={<DownloadIcon />}
              href={TAWARA_RELEASES} target='_blank' rel='noopener noreferrer'
            >Tawara for desktop
            </Button>
            <Button
              variant='outlined' startIcon={<DownloadIcon />}
              href={TAWARA_MOBILE_RELEASES} target='_blank' rel='noopener noreferrer'
            >Tawara for Android
            </Button>
          </Stack>

          <Block title='How staking works'>
            <Body>
              Since block 1,136,384, half of the reward of every block the
              validators finalize is paid to stakers. Each staker's share is
              proportional to their <Strong>stake weight</Strong>, compared with
              the weight of everyone else staking in that block:
            </Body>
            <Box
              sx={{
                my: 2.5,
                p: 2.25,
                borderRadius: '14px',
                border: '1px solid rgba(21,220,150,0.42)',
                background: 'rgba(21,220,150,0.08)',
                fontFamily: mono,
                color: tokens.text,
                textAlign: 'center',
                fontSize: { xs: '0.85rem', md: '1rem' }
              }}
            >stake weight = (staked MCM + accrued rewards) x (tier + 1)
            </Box>
            <Bullets
              items={[
                <>Rewards are credited to your address every block and <Strong>compound</Strong>: they count toward your weight for as long as the coins stay staked.</>,
                <>A longer lock earns more. The tier you choose sets your weight multiplier, from 1x to 6x.</>,
                <>Placeholder blocks, minted when the validators do not finalize a block in time, pay no staking rewards. Transaction fees go to the validators.</>,
                <>Stakes are paid in a fixed order every block, and any rounding remainder goes to the network's founder address.</>
              ]}
            />
          </Block>

          <Block title='Lock tiers'>
            <Body>
              When you stake you choose a tier. The lock lasts at least the number
              of blocks shown and ends at the next neogenesis block after that,
              so it may run up to 255 blocks longer. Times assume about one block
              a minute.
            </Body>
            <TierTable />
            <Body sx={{ mb: 0 }}>
              When the lock ends, your stake keeps earning at the same tier until
              you unstake or claim.
            </Body>
          </Block>

          <Block title='The rules'>
            <Bullets
              items={[
                <>The <Strong>minimum stake</Strong> is 500 MCM. It falls by 10 MCM every 65,536 blocks, to a floor of 10 MCM.</>,
                <>You can stake all of an address's balance or part of it. The rest stays spendable, and the address can still receive.</>,
                <>One stake per address, and no top-ups: to change the amount, unstake and stake again.</>,
                <>You cannot stake while the address has unclaimed staking rewards: claim them first.</>,
                <>Each staking transaction (stake, unstake or claim) costs the standard fee of 0.0000005 MCM.</>,
                <>Validator addresses cannot stake.</>
              ]}
            />
          </Block>

          <Block title='Unstaking and claiming'>
            <Bullets
              items={[
                <><Strong>Unstaking before the lock ends forfeits your accrued rewards.</Strong> They are split among the remaining stakers in that block. Your staked coins are returned to you, less the fee.</>,
                <>Unstaking after the lock ends returns your staked coins. Your rewards stay on the address until you claim them.</>,
                <>A claim after the lock ends releases your rewards into your spendable balance and also ends the stake. A claim while the lock still holds releases nothing and still costs the fee.</>
              ]}
            />
          </Block>

          <Block title='How to stake with Tawara'>
            <Bullets
              numbered
              items={[
                <>Download Tawara for your platform and create a wallet, or restore one from your recovery phrase. Fund an account with at least the minimum stake plus the fee.</>,
                <>Open <Strong>Stake</Strong> and choose the account to stake from. The page shows its spendable balance, any stake it holds, and the network's current minimum.</>,
                <>Enter the amount, or use <Strong>The most it can take</Strong>, and choose a lock tier.</>,
                <>Select <Strong>Review stake</Strong>. Tawara shows exactly what will be signed: the amount, the tier and its weight multiplier, and how long the coins stay locked.</>,
                <>Select <Strong>Sign &amp; submit</Strong>. Nothing is staked until you do. Once the next block includes it, the Stake page shows your stake, its tier, when the lock ends and the rewards it has earned.</>,
                <>To stop staking, open the Stake page and choose <Strong>Unstake</Strong>, or <Strong>Claim</Strong> after the lock ends. Tawara warns you before an unstake that would forfeit rewards.</>
              ]}
            />
          </Block>

          <Block title='Keep your recovery phrase safe'>
            <Body sx={{ mb: 0 }}>
              Tawara creates and encrypts your keys on your own device, and they
              never leave it. Staked coins stay at your own address, so your
              recovery phrase restores them along with the rest of the wallet.
              Tawara's source code is public:{' '}
              <Link href='https://github.com/adequatelimited/Tawara-wallet' target='_blank' rel='noopener noreferrer'>
                github.com/adequatelimited/Tawara-wallet <OpenInNewIcon sx={{ fontSize: '0.9rem', verticalAlign: 'middle' }} />
              </Link>
            </Body>
          </Block>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}
