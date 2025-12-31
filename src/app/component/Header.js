
import { useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger
} from '@mui/material';

import { service } from 'links';

function Unselectable (props) {
  return (
    <Typography
      sx={{
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      }} {...props}
    />
  );
}

function Headertitle ({ dense, ...props }) {
  const hsx = { height: dense ? 48 : 64, transition: 'height 250ms ease' };
  let tip, src;
  switch (new Date().getMonth()) {
    case 1:
      src = '/assets/images/logo-kanji-brushed.png';
      tip = 'Mochimo Brushed Kanji Logo by Chrisdigity';
      break;
    default:
      src = '/assets/images/logo.png';
      tip = '';
  }

  return (
    <Tooltip title={tip} arrow>
      <Link underline='none' to='/' sx={hsx}>
        <Box display='flex' alignItems='center'>
          <img alt={tip} src={src} style={hsx} />
          <Box sx={{ position: 'relative', height: dense ? 40 : 56 }}>
            <Unselectable
              fontFamily='Nunito Sans'
              fontSize={dense ? '1.5em' : '2.25em'}
              color='textPrimary'
            >MOCHIMO
            </Unselectable>
            <Unselectable
              color='textPrimary'
              noWrap variant='caption' fontSize={dense ? '0.5em' : '0.75em'}
              sx={{ position: 'absolute', right: '0.25em', bottom: 0 }}
            >Post-Quantum Currency
            </Unselectable>
          </Box>
        </Box>
      </Link>
    </Tooltip>
  );
}

function Headernav ({ dense, ...props }) {
  const bold = useLocation().pathname.includes(props.children.toLowerCase());
  const isBuyButton = props.children === 'Find MCM on Biconomy Exchange';
  
  return (
    <Link
      underline='none' {...props}
      component={props.href ? 'a' : Link}
      sx={{
        display: { xs: 'none', sm: 'none', md: 'inline' },
        marginLeft: 2,
        color: 'white',
        fontFamily: 'Roboto Mono',
        fontWeight: bold ? 'bold' : '',
        fontSize: dense ? '1.2em' : '1.35em',
        ...(isBuyButton && {
          border: '2px solid #0059ff',
          borderRadius: '8px',
          padding: '6px 16px',
          backgroundColor: 'rgba(0, 89, 255, 0.1)',
          transition: 'all 0.2s'
        }),
        '&:hover': { 
          textShadow: '0 0 0.25em white', 
          cursor: 'pointer',
          ...(isBuyButton && {
            backgroundColor: 'rgba(0, 89, 255, 0.3)',
            transform: 'scale(1.05)'
          })
        }
      }}
    />
  );
}

function Headerbutton ({ title, ...props }) {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        component={props.href ? 'a' : null} {...props}
        sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
      />
    </Tooltip>
  );
}

export default function Header ({ actualTheme }) {
  const dense = useScrollTrigger({
    disableHysteresis: true,
    threshold: 25
  });

  return (
    <AppBar
      position='fixed'
      color='primary'
      sx={{ boxShadow: 'default' }}
    >
      <Container disableGutters>
        <Toolbar
          variant='dense'
          sx={{ 
            marginTop: '10px',
            marginBottom: '10px'
          }}
        >
          <Headertitle dense={true} />
          <Box flexGrow={1} />
          <Box display='flex' justifyContent='center' alignItems='center' gap={3}>
            <Headernav dense={true} href="https://mochiscan.org" target="_blank" rel="noopener noreferrer">
              Explorer
            </Headernav>
            <Headernav dense={true} href='https://chromewebstore.google.com/detail/mochimo-wallet/fkogefgjocnflhankmffnibdofdiiiho' target="_blank" rel="noopener noreferrer">
              Wallet
            </Headernav>
            <Headernav dense={true} href='/assets/files/mochimo_wp_EN.pdf' target="_blank" rel="noopener noreferrer">
              Whitepaper
            </Headernav>
            <Headernav dense={true} href='https://www.biconomy.com/exchange/MCM_USDT' target="_blank" rel="noopener noreferrer">
              Find MCM on Biconomy Exchange
            </Headernav>
          </Box>
          <Box flexGrow={1} />
          <Box display='flex' alignItems='center' gap={1}>
            {service.map(({ href, Icon, primary }, i) => (
              <Headerbutton
                key={`headerlink-${i}`} href={href} title={primary}
              ><Icon />
              </Headerbutton>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
