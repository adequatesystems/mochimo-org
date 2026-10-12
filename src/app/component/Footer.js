import { Box, Container, Divider, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

import { scrollToTopNow } from './ScrollToTop';
import { social } from 'links';
import { tokens, mono, display } from 'theme';

const columns = [
  {
    heading: 'About',
    links: [
      { label: 'Mochimo', to: '/' },
      { label: 'Adequate', to: '/adq' },
      { label: 'Meet The Team', to: '/meet-the-team' },
      { label: 'Privacy', to: '/privacy-policy' }
    ]
  },
  {
    heading: 'Network',
    links: [
      { label: 'Explorer', href: 'https://mochiscan.org' },
      { label: 'Live Status', to: '/status' },
      { label: 'Proof of Stake', to: '/mining' },
      { label: 'PoS Vote', to: '/vote' }
    ]
  },
  {
    heading: 'Links',
    links: [
      { label: 'Github', href: 'https://github.com/mochimodev/mochimo/releases' },
      { label: 'Whitepaper', href: '/assets/files/mochimo_wp_EN.pdf' },
      { label: 'Exchanges', to: '/exchanges-mcm' },
      { label: 'Merchandise', href: 'https://my-store-b9cfd9.creator-spring.com' },
      { label: 'CoinMarketCap', href: 'https://coinmarketcap.com/currencies/mochimo/' }
    ]
  }
];

function FooterLink ({ label, to, href }) {
  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { to, onClick: scrollToTopNow };
  return (
    <Link
      underline='none' {...props}
      sx={{
        display: 'block',
        fontSize: '0.875rem',
        color: tokens.textDim,
        py: 0.6,
        transition: 'color 160ms ease, transform 160ms ease',
        '&:hover': { color: tokens.text, transform: 'translateX(3px)' }
      }}
    >{label}
    </Link>
  );
}

export default function Footer () {
  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        zIndex: 2,
        mt: 0,
        overflow: 'hidden',
        borderTop: '1px solid #24343A',
        bgcolor: tokens.base
      }}
    >
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1, pt: { xs: 6, md: 8 }, pb: 4 }}>
        <Grid container spacing={{ xs: 5, md: 4 }}>
          <Grid item xs={12} md={4.5}>
            <Box
              component='img' alt='Mochimo logo and slogan'
              src='/assets/images/logo-lockup.svg'
              sx={{ height: 40, width: 'auto', maxWidth: '100%', display: 'block', mb: 2.5 }}
            />
            <Typography
              sx={{ color: tokens.textDim, fontSize: '0.9rem', maxWidth: 380, mb: 3 }}
            >
              The world's first completely quantum resistant cryptocurrency.
              Fully decentralized, with post-quantum signatures since 2018. Now running on proof of stake.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 3, ml: -1 }}>
              {social.map(({ href, Icon, primary }) => (
                <Tooltip key={primary} title={primary}>
                  <IconButton
                    component='a' href={href} target='_blank' rel='noopener noreferrer'
                    size='small' sx={{ color: tokens.textDim }}
                  ><Icon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ))}
              <Tooltip title='Email'>
                <IconButton
                  component='a' href='mailto:support@mochimo.org'
                  size='small' sx={{ color: tokens.textDim }}
                ><EmailIcon fontSize='small' />
                </IconButton>
              </Tooltip>
            </Box>
            <Link
              to='/adq' onClick={scrollToTopNow}
              sx={{ display: 'inline-flex', alignItems: 'center', gap: 1.25, opacity: 0.65, '&:hover': { opacity: 1 } }}
            >
              <Typography
                sx={{
                  fontFamily: mono,
                  fontSize: '0.62rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: tokens.textFaint
                }}
              >Built by
              </Typography>
              <Box
                component='img' alt='Adequate Systems'
                src='/assets/source/adq-logo.svg'
                sx={{ width: 110 }}
              />
            </Link>
          </Grid>

          {columns.map(({ heading, links }) => (
            <Grid item xs={6} sm={4} md={2.5} key={heading}>
              <Typography
                sx={{
                  fontFamily: display,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: tokens.textDim,
                  mb: 1.75
                }}
              >{heading}
              </Typography>
              {links.map((link) => (
                <FooterLink key={link.label} {...link} />
              ))}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ mt: { xs: 5, md: 7 }, mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1.5,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography sx={{ fontSize: '0.78rem', color: tokens.textFaint }}>
            Copyright 2026 &copy; All rights Reserved. The Mochimo Foundation.
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: tokens.textFaint }}>
            Some icons by&nbsp;
            <Link href='https://www.flaticon.com/authors/icongeek26' color='inherit' underline='hover'>icongeek26</Link>,&nbsp;
            <Link href='https://www.flaticon.com/authors/phatplus' color='inherit' underline='hover'>phatplus</Link>,&nbsp;
            <Link href='https://www.flaticon.com/authors/freepik' color='inherit' underline='hover'>Freepik</Link> -&nbsp;
            <Link href='https://www.flaticon.com/' color='inherit' underline='hover'>Flaticon</Link>
          </Typography>
        </Box>
      </Container>
      <Box
        component='img' src='/assets/images/brand-mark.svg' alt='' aria-hidden
        sx={{
          position: 'absolute',
          right: { xs: -120, md: -60 },
          bottom: { xs: -140, md: -110 },
          width: { xs: 320, md: 440 },
          height: 'auto',
          opacity: 0.05,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />
    </Box>
  );
}
