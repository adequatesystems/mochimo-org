import { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { service, social } from 'links';
import { tokens, fx, display } from 'theme';

export const BUY_MCM = {
  href: 'https://www.biconomy.com/exchange/MCM_USDT',
  label: 'Buy MCM',
  full: 'Find MCM on Biconomy Exchange'
};

const primaryNav = [
  { label: 'Explorer', href: 'https://mochiscan.org', external: true },
  { label: 'Proof of Stake', to: '/mining' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Whitepaper', href: '/assets/files/mochimo_wp_EN.pdf', external: true },
  {
    label: 'Wallet',
    href: 'https://chromewebstore.google.com/detail/mochimo-wallet/fkogefgjocnflhankmffnibdofdiiiho',
    external: true
  }
];

const drawerNav = [
  ...primaryNav,
  { label: 'PoS Vote', to: '/vote' },
  { label: 'Exchanges', to: '/exchanges-mcm' },
  { label: 'Meet The Team', to: '/meet-the-team' },
  { label: 'Adequate Systems', to: '/adq' },
  { label: 'Live System Status', to: '/status' },
  { label: 'Merchandise', href: 'https://my-store-b9cfd9.creator-spring.com', external: true },
  { label: 'CoinMarketCap', href: 'https://coinmarketcap.com/currencies/mochimo/', external: true },
  { label: 'Github', href: 'https://github.com/mochimodev', external: true }
];

function Wordmark ({ dense }) {
  return (
    <Link
      underline='none' to='/'
      sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}
    >
      <Box
        component='img' alt='Mochimo' src='/assets/images/logo-lockup.svg'
        sx={{
          display: 'block',
          width: 'auto',
          height: dense ? 30 : { xs: 30, md: 36 },
          transition: 'height 250ms ease'
        }}
      />
    </Link>
  );
}

function NavItem ({ item }) {
  const { pathname } = useLocation();
  const active = item.to && (item.to === '/' ? pathname === '/' : pathname.startsWith(item.to));
  const props = item.external
    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
    : { to: item.to };

  return (
    <Link
      underline='none' {...props}
      sx={{
        position: 'relative',
        fontFamily: display,
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: 0,
        color: active ? tokens.text : tokens.textDim,
        padding: '6px 0',
        transition: 'color 180ms ease',
        '&:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '1px',
          background: tokens.brand,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 260ms cubic-bezier(0.22,1,0.36,1)'
        },
        '&:hover': { color: tokens.text },
        '&:hover:after': { transform: 'scaleX(1)' }
      }}
    >{item.label}
    </Link>
  );
}

export default function Header () {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position='fixed'
        sx={{
          zIndex: 1200,
          backgroundColor: 'rgba(23,33,36,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #24343A',
          transition: 'background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease'
        }}
      >
        <Container maxWidth='lg' disableGutters>
          <Toolbar
            disableGutters
            sx={{
              px: { xs: 2, md: 3 },
              minHeight: { xs: 64, md: 76 },
              transition: 'min-height 250ms ease',
              gap: 2
            }}
          >
            <Wordmark />
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '30px'
              }}
            >
              {primaryNav.map((item) => (
                <NavItem key={item.label} item={item} />
              ))}
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 1,
                ml: 1.5
              }}
            >
              {service.map(({ Icon, primary }) => (
                <Tooltip key={primary} title={primary}>
                  <IconButton
                    component={RouterLink} to='/status'
                    size='small' sx={{ color: tokens.textFaint }}
                  ><Icon fontSize='small' />
                  </IconButton>
                </Tooltip>
              ))}
              <Tooltip title={BUY_MCM.full}>
                <Button
                  variant='contained' size='small'
                  href={BUY_MCM.href} target='_blank' rel='noopener noreferrer'
                  sx={{ ml: 0.5, whiteSpace: 'nowrap' }}
                >{BUY_MCM.label}
                </Button>
              </Tooltip>
            </Box>
            <IconButton
              onClick={() => setOpen(true)}
              aria-label='Open navigation menu'
              sx={{ display: { xs: 'inline-flex', md: 'none' }, color: tokens.text }}
            ><MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor='right' open={open} onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: '86vw', sm: 380 },
            backgroundColor: 'rgba(23,33,36,0.98)',
            backdropFilter: 'blur(20px)',
            borderLeft: fx.hairline,
            backgroundImage: 'none'
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', p: 2, pr: 1.5 }}>
          <Wordmark dense />
          <Box sx={{ flexGrow: 1 }} />
          <IconButton onClick={() => setOpen(false)} aria-label='Close navigation menu'>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth variant='contained'
            href={BUY_MCM.href} target='_blank' rel='noopener noreferrer'
            onClick={() => setOpen(false)}
          >{BUY_MCM.full}
          </Button>
        </Box>
        <List sx={{ px: 1, flexGrow: 1, overflowY: 'auto' }}>
          {drawerNav.map((item) => {
            const props = item.external
              ? { component: 'a', href: item.href, target: '_blank', rel: 'noopener noreferrer' }
              : { component: Link, to: item.to };
            return (
              <ListItemButton
                key={item.label} {...props}
                onClick={() => setOpen(false)}
                sx={{ borderRadius: 2, py: 1.25 }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontFamily: display,
                    fontSize: '0.98rem',
                    fontWeight: 500,
                    color: tokens.text
                  }}
                />
                {item.external && (
                  <OpenInNewIcon sx={{ fontSize: 15, color: tokens.textFaint }} />
                )}
              </ListItemButton>
            );
          })}
        </List>
        <Divider />
        <Box sx={{ p: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {social.map(({ href, Icon, primary }) => (
            <Tooltip key={primary} title={primary}>
              <IconButton
                component='a' href={href} target='_blank' rel='noopener noreferrer'
                size='small' sx={{ color: tokens.textDim }}
              ><Icon fontSize='small' />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Drawer>
    </>
  );
}
