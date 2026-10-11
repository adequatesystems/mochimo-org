
import { lazy, Suspense, useEffect, useState } from 'react';
import { Box, ButtonBase, Typography } from '@mui/material';

import SpaIcon from '@mui/icons-material/Spa';
import PublicIcon from '@mui/icons-material/Public';

import { useGetNetworkQuery } from 'api';
import { display as fontDisplay, mono, tokens } from '../theme';

const NetworkFlower = lazy(() => import('./component/NetworkFlower'));
const NetworkGlobe = lazy(() => import('./component/NetworkGlobe'));

export default function Network ({ type }) {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState(type || 'globe');
  const network = useGetNetworkQuery();

  const nodeCount = Array.isArray(network.data) ? network.data.length : (network.data && typeof network.data === 'object' ? Object.keys(network.data).length : 0);
  const ok = !network.isLoading && !network.isError && nodeCount > 0;
  let status;
  if (network.isLoading) {
    status = 'Connecting to the network';
  } else if (network.isError || nodeCount === 0) {
    status = 'Live node data is unavailable right now';
  } else {
    status = `${nodeCount.toLocaleString('en-US')} active nodes`;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '100vh',
        '@supports (height: 100dvh)': { height: '100dvh' },
        overflow: 'hidden',
        bgcolor: tokens.base
      }}
    >
      {(!isMounted && (null)) || (
        (display === 'flower' && (
          <Suspense fallback={null}>
            <NetworkFlower enable={!type} />
          </Suspense>
        )) || (display === 'globe' && (
          <Suspense fallback={null}>
            <NetworkGlobe />
          </Suspense>
        ))
      )}
      {!type && (
        <Box
          component='section' aria-label='Network view controls'
          sx={{
            position: 'fixed',
            zIndex: 2,
            left: { xs: 16, md: 32 },
            right: { xs: 16, md: 'auto' },
            bottom: { xs: 'calc(16px + env(safe-area-inset-bottom))', md: 32 },
            maxWidth: { md: 400 },
            bgcolor: 'rgba(29,42,46,0.94)',
            border: `1px solid ${tokens.line}`,
            borderRadius: '20px',
            p: { xs: 2.5, md: 3 }
          }}
        >
          <Typography
            component='h1'
            sx={{
              fontFamily: fontDisplay,
              fontWeight: 600,
              fontSize: { xs: '1.35rem', md: '1.6rem' },
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: tokens.text
            }}
          >
            The Mochimo network
          </Typography>
          <Typography sx={{ mt: 1, fontSize: '0.875rem', lineHeight: 1.6, color: tokens.textDim }}>
            Realtime view of active nodes and the messages passing between them.
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              aria-hidden
              sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: ok ? tokens.brand : tokens.textFaint }}
            />
            <Typography
              role='status'
              sx={{
                fontFamily: mono,
                fontSize: '0.6875rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: ok ? tokens.text : tokens.textFaint
              }}
            >
              {status}
            </Typography>
          </Box>
          <Box
            role='group' aria-label='Visualisation'
            sx={{
              mt: 2.5,
              display: 'inline-flex',
              p: 0.5,
              gap: 0.5,
              border: `1px solid ${tokens.line}`,
              borderRadius: '14px',
              bgcolor: tokens.base
            }}
          >
            <ButtonBase
              aria-pressed={display === 'globe'}
              onClick={() => setDisplay('globe')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 1,
                borderRadius: '10px',
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: '0.875rem',
                color: display === 'globe' ? tokens.base : tokens.textDim,
                bgcolor: display === 'globe' ? tokens.brand : 'transparent',
                transition: 'background-color 200ms ease, color 200ms ease',
                '&:hover': { color: display === 'globe' ? tokens.base : tokens.text },
                '&:focus-visible': { outline: `2px solid ${tokens.brand}`, outlineOffset: 2 }
              }}
            >
              <PublicIcon fontSize='small' />
              Globe
            </ButtonBase>
            <ButtonBase
              aria-pressed={display === 'flower'}
              onClick={() => setDisplay('flower')}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 1.75,
                py: 1,
                borderRadius: '10px',
                fontFamily: fontDisplay,
                fontWeight: 600,
                fontSize: '0.875rem',
                color: display === 'flower' ? tokens.base : tokens.textDim,
                bgcolor: display === 'flower' ? tokens.brand : 'transparent',
                transition: 'background-color 200ms ease, color 200ms ease',
                '&:hover': { color: display === 'flower' ? tokens.base : tokens.text },
                '&:focus-visible': { outline: `2px solid ${tokens.brand}`, outlineOffset: 2 }
              }}
            >
              <SpaIcon fontSize='small' />
              Flower
            </ButtonBase>
          </Box>
        </Box>
      )}
    </Box>
  );
}
