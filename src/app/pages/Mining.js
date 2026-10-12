import { useEffect } from 'react';
import { Box, Button, Chip, Grid, Link, Stack, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from '@mui/icons-material/Terminal';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Discord } from 'links';
import DiscordIcon from '../icons/DiscordIcon';
import { scrollToTopNow } from '../component/ScrollToTop';
import { Section, SectionHeading, PageHero, Reveal, GlassPanel } from '../component/Section';
import { tokens, fx, mono, display } from 'theme';

const osIcons = {
  Windows: <DesktopWindowsIcon fontSize='small' />,
  Linux: <LinuxIcon fontSize='small' />,
  MacOS: <AppleIcon fontSize='small' />
};

const transitionStages = [
  {
    name: 'Proof of work',
    description: 'Mining secured Mochimo from the genesis block on June 25, 2018 until the move to proof of stake.',
    status: 'Retired',
    pillSx: { border: `1px solid ${tokens.lineStrong}`, color: tokens.textDim }
  },
  {
    name: 'Transition',
    description: 'The network has moved from proof of work to proof of stake.',
    status: 'Complete',
    pillSx: { border: `1px solid ${tokens.lineStrong}`, color: tokens.textDim }
  },
  {
    name: 'Proof of stake',
    description: 'Mochimo now runs on proof of stake. More resources about how it works are coming soon.',
    status: 'Live',
    pillSx: { bgcolor: tokens.brand, color: tokens.base }
  }
];

const soloMiners = [
  {
    platform: 'Windows',
    icon: <DesktopWindowsIcon />,
    description: 'Official Windows miner for Mochimo',
    link: 'https://github.com/mochimodev/mochimo/releases/tag/v3.0.3',
    instructions: 'Download the latest Windows release, extract it, and run mochimo.exe'
  },
  {
    platform: 'Linux',
    icon: <LinuxIcon />,
    description: 'Prebuilt miner for Linux, run from the terminal',
    link: 'https://github.com/mochimodev/mochimo/releases/tag/v3.0.3',
    instructions: 'Extract mcmminer-v3.0.3.ubuntu.cuda-12.8-570.86.10.tar.gz and run it.'
  }
];

const miningPools = [
  {
    name: 'MochiPool',
    url: 'https://mochimodash.ddns.net/d/beeckp9iv0b9cd/mochipool',
    fee: '10%',
    description: 'A French-community driven mining pool with a focus on constant payouts and individual rig statistics tool.',
    discord: 'https://discord.gg/hcjZUVCnh7',
    icon: '/assets/images/mochipool-logo.png',
    supportedOS: ['Windows', 'Linux'],
    details: [
      { icon: <LocationOnIcon fontSize='small' />, label: 'Location', value: 'Switzerland (for improved data privacy)' },
      { icon: <PaymentIcon fontSize='small' />, label: 'Payouts', value: 'Twice per week (Sunday and Wednesday)' }
    ],
    howToJoin: {
      discordLink: 'https://discord.com/channels/1345166405263163464/1345167185567420448/1345174621648977991',
      description: 'Join the Discord server and follow the setup instructions in the #how-to-join channel.'
    }
  }
];

function DetailRow ({ icon, label, value }) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
      <Box sx={{ color: tokens.brand, mt: '2px' }}>{icon}</Box>
      <Box>
        <Typography
          sx={{
            fontFamily: mono,
            fontSize: '0.6875rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: tokens.textFaint
          }}
        >{label}
        </Typography>
        <Typography sx={{ color: tokens.text, fontSize: '0.875rem' }}>{value}</Typography>
      </Box>
    </Box>
  );
}

export default function Mining () {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Section sx={{ pt: { xs: 2, md: 3 }, pb: { xs: 4, md: 6 } }}>
        <Reveal>
          <PageHero
            title='Proof of Stake'
            lede='Mochimo now runs on proof of stake. Mining and proof of work are retired, and more resources about proof of stake are coming soon.'
          />
        </Reveal>
      </Section>

      <Section id='transition' sx={{ py: { xs: 4, md: 6 } }}>
        <Typography
          component='h2'
          sx={{ fontFamily: display, fontWeight: 600, fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.1, letterSpacing: '-0.025em', mb: { xs: 3, md: 4 } }}
        >Where the network is now.
        </Typography>
        <Box
          role='list'
          sx={{ border: `1px solid ${tokens.line}`, borderRadius: '20px', overflow: 'hidden', bgcolor: tokens.raise }}
        >
          {transitionStages.map((stage, i) => (
            <Box
              role='listitem' key={stage.name}
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: 'minmax(0,1fr) auto', md: '220px minmax(0,1fr) auto' },
                columnGap: { xs: 2, md: 3 },
                rowGap: 0.75,
                alignItems: 'center',
                px: { xs: 2.5, md: 3 },
                py: { xs: 2.25, md: 2.75 },
                borderTop: i > 0 ? `1px solid ${tokens.line}` : 'none'
              }}
            >
              <Typography sx={{ fontFamily: display, fontWeight: 600, fontSize: '1rem', color: tokens.text }}>
                {stage.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.9375rem',
                  lineHeight: 1.6,
                  color: tokens.textDim,
                  gridColumn: { xs: '1 / -1', md: 'auto' },
                  gridRow: { xs: 2, md: 'auto' }
                }}
              >{stage.description}
              </Typography>
              <Box
                component='span'
                sx={{
                  display: 'inline-flex',
                  px: 1.25,
                  py: 0.5,
                  borderRadius: 999,
                  fontFamily: mono,
                  fontSize: '0.625rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  justifySelf: 'end',
                  ...stage.pillSx
                }}
              >{stage.status}
              </Box>
            </Box>
          ))}
        </Box>
        <Typography sx={{ mt: 3, maxWidth: '62ch', color: tokens.textDim, lineHeight: 1.7 }}>
          WOTS+ signatures do not change. Post-quantum protection comes from how transactions are signed, not from the consensus mechanism.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: { xs: 3, md: 4 } }}>
          <Button variant='contained' component={RouterLink} to='/vote' endIcon={<ArrowForwardIcon />}>
            Read about the vote
          </Button>
          <Button
            variant='outlined'
            href={Discord.href} target='_blank' rel='noopener noreferrer'
            startIcon={<DiscordIcon />}
          >Follow updates on Discord
          </Button>
        </Box>
      </Section>

      <Section id='legacy' sx={{ pb: 0, pt: { xs: 6, md: 8 } }}>
        <Box sx={{ borderTop: '1px solid #24343A', pt: { xs: 5, md: 7 } }}>
          <Typography
            component='h2'
            sx={{ fontFamily: display, fontWeight: 600, fontSize: { xs: '2rem', md: '2.75rem' }, lineHeight: 1.1, letterSpacing: '-0.025em', mb: { xs: 3, md: 4 } }}
          >Legacy mining software
          </Typography>
          <Typography sx={{ mt: 2, maxWidth: '62ch', color: tokens.textDim, lineHeight: 1.7 }}>
            Kept for reference. Mining is retired now that the network runs on proof of stake.
          </Typography>
        </Box>
      </Section>

      <Section id='solo-mining' sx={{ py: { xs: 4, md: 6 } }}>
        <SectionHeading
          title='Solo miners'
          subtitle='Release v3.0.3 miners for Windows and Linux, as published on GitHub.'
          maxWidth={720}
        />
        <Grid container spacing={3} alignItems='stretch'>
          {soloMiners.map((miner, i) => (
            <Grid item xs={12} md={6} key={miner.platform} sx={{ display: 'flex' }}>
              <Reveal delay={i * 90} sx={{ width: '100%' }}>
                <GlassPanel hover sx={{ p: { xs: 3, md: 3.5 }, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.75, mb: 2 }}>
                    <Box
                      sx={{
                        width: 46, height: 46, borderRadius: '10px',
                        display: 'grid', placeItems: 'center',
                        border: fx.hairline, background: 'rgba(21,220,150,0.08)',
                        color: tokens.brand
                      }}
                    >{miner.icon}
                    </Box>
                    <Typography variant='h6' sx={{ fontSize: '1.35rem' }}>{miner.platform}</Typography>
                  </Box>
                  <Typography sx={{ color: tokens.text, fontSize: '0.95rem', mb: 1.5 }}>
                    {miner.description}
                  </Typography>
                  <Typography
                    sx={{
                      color: tokens.textDim,
                      fontFamily: mono,
                      fontSize: '0.8125rem',
                      lineHeight: 1.65,
                      p: 1.75,
                      mb: 2.5,
                      borderRadius: '10px',
                      border: fx.hairline,
                      background: tokens.base,
                      wordBreak: 'break-word'
                    }}
                  >{miner.instructions}
                  </Typography>
                  <Button
                    variant='outlined' size='small'
                    href={miner.link} target='_blank' rel='noopener'
                    startIcon={<DownloadIcon />}
                  >Download {miner.platform} miner (legacy)
                  </Button>
                </GlassPanel>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section id='mining-pools' sx={{ py: { xs: 4, md: 6 } }}>
        <SectionHeading
          title='MochiPool'
          subtitle='The community pool that operated during proof of work.'
          maxWidth={760}
        />
        <Grid container spacing={3}>
          {miningPools.map((pool, i) => (
            <Grid item xs={12} key={pool.name}>
              <Reveal delay={i * 90}>
                <GlassPanel sx={{ p: { xs: 3, md: 4 } }}>
                  <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid item xs={12} md={5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Box
                          component='img' alt={`${pool.name} icon`} src={pool.icon}
                          sx={{
                            width: 52, height: 52, borderRadius: '10px',
                            objectFit: 'cover', border: fx.hairline
                          }}
                        />
                        <Box>
                          <Typography variant='h6' sx={{ fontSize: '1.35rem', lineHeight: 1.2 }}>
                            <Link href={pool.url} target='_blank' rel='noopener' underline='hover' color='inherit'>
                              {pool.name}
                            </Link>
                          </Typography>
                          <Typography
                            sx={{
                              fontFamily: mono,
                              fontSize: '0.6875rem',
                              color: tokens.accent,
                              letterSpacing: '0.06em'
                            }}
                          >Fee: {pool.fee}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ color: tokens.textDim, fontSize: '0.94rem', lineHeight: 1.7, mb: 2.5 }}>
                        {pool.description}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: mono,
                          fontSize: '0.6875rem',
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          color: tokens.textFaint,
                          mb: 1
                        }}
                      >Supported OS
                      </Typography>
                      <Stack direction='row' spacing={1}>
                        {pool.supportedOS.map((os) => (
                          <Chip key={os} icon={osIcons[os]} label={os} size='small' variant='outlined' />
                        ))}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <Stack spacing={2.5} sx={{ mb: 3 }}>
                        {pool.details.map((d) => (
                          <DetailRow key={d.label} {...d} />
                        ))}
                      </Stack>
                      <Box
                        sx={{
                          p: 2.5,
                          borderRadius: '10px',
                          border: fx.hairline,
                          background: 'rgba(21,220,150,0.06)'
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: display,
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            mb: 1
                          }}
                        >How to Join
                        </Typography>
                        <Typography sx={{ color: tokens.textDim, fontSize: '0.875rem', mb: 2 }}>
                          {pool.howToJoin.description}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                          <Button
                            variant='outlined' size='small'
                            startIcon={<DiscordIcon />}
                            href={pool.howToJoin.discordLink}
                            target='_blank' rel='noopener'
                          >Setup Instructions
                          </Button>
                          <Tooltip title='Join Discord community'>
                            <Button
                              variant='outlined' size='small'
                              startIcon={<DiscordIcon />}
                              href={pool.discord}
                              target='_blank' rel='noopener'
                            >Pool Discord
                            </Button>
                          </Tooltip>
                          <Button
                            variant='outlined' size='small'
                            endIcon={<ArrowForwardIcon />}
                            href={pool.url}
                            target='_blank' rel='noopener'
                          >Pool Dashboard
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </GlassPanel>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
}
