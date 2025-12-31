
import { useState } from 'react';
import { Box, CircularProgress, Container, Typography } from '@mui/material';

export default function Status () {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setLoading(false);
    if (window.iFrameResize) {
      window.iFrameResize([{ log: false }], '.htframe');
    }
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <Container sx={{ position: 'relative', padding: 2 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ textAlign: 'center', padding: 4 }}>
          <Typography color='error'>
            Failed to load status monitor. Please try again later.
          </Typography>
        </Box>
      )}
      <iframe
        title='embedded services status and uptime monitor'
        className='htframe' 
        width='100%' 
        style={{ 
          border: 'none',
          display: loading ? 'none' : 'block'
        }}
        src='https://wl.hetrixtools.com/r/b41a90593288f05a8dfb15f3af2863bf/'
        sandbox='allow-scripts allow-same-origin allow-popups'
        onLoad={handleLoad}
        onError={handleError}
      />
    </Container>
  );
}
