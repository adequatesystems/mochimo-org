
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Box, Typography } from '@mui/material';

import SpaIcon from '@mui/icons-material/Spa';
import PublicIcon from '@mui/icons-material/Public';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const NetworkSpoiledGlobe = lazy(() => import('./component/NetworkSpoiledGlobe'));

export default function Network ({ type }) {
  const [isMounted, setIsMounted] = useState(false);
  const [display, setDisplay] = useState(type || 'globe');
  const box = useRef();

  // scroll listener (parallax, within page content) where within page content
  useEffect(() => {
    setIsMounted(true);
    
    return () => {
    };
  }, []);

  return (
    <Box
      ref={box} sx={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '100vh', overflow: 'hidden'
      }}
    >
      <Suspense fallback={null}>
            <NetworkSpoiledGlobe />
        </Suspense>
      
    </Box>
  );
}
