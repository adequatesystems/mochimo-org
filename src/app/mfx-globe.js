
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';

const NetworkGlobe = lazy(() => import('./component/NetworkGlobe'));

export default function Network ({ type }) {
  const [isMounted, setIsMounted] = useState(false);
  const boxSX = {
    top: 0,
    left: 0,
    right: 0,
    height: '100vh',
    overflow: 'hidden',
    position: 'absolute'
  };

  // scroll listener (parallax, within page content) where within page content
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box sx={boxSX}>
      <Suspense fallback={null}>
        <NetworkGlobe mfx />
      </Suspense>
    </Box>
  );
}
