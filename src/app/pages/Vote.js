import { useEffect } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { scrollToTopNow } from '../component/ScrollToTop';

export default function Vote() {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          background: '#0059ff',
          color: 'white',
          padding: 2,
          borderRadius: 2,
          textAlign: 'center',
          marginTop: 4,
          marginBottom: 3,
          boxShadow: '0 4px 12px rgba(0, 89, 255, 0.4)'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Roboto Mono',
            fontWeight: 'bold'
          }}
        >
          VOTING HAS ENDED
        </Typography>
      </Box>

      <Typography variant='h2' align='center' gutterBottom sx={{ marginBottom: 4 }}>
        PoW-PoS Vote Results
      </Typography>

      <Paper
        elevation={3}
        sx={{
          padding: 4,
          backgroundColor: 'rgba(30, 30, 30, 0.85)',
          borderRadius: 2
        }}
      >
        <Typography variant="body1" paragraph>
          It's official, the community voted in favor of PoS! The final vote tallies were 2,164,054.69 MCM for PoW and 2,912,738.73, with a split of 42.6% to 57.4%. Proof-of-Stake only slightly edged out Proof-of-Work, sparking a wider conversation about the future of the network, and whether it might be desirable to have a separate PoW-only network in addition to a future PoS Mochimo network. See below for the full vote readout as of 00:00:00 GMT on 05/01/2026.
        </Typography>

        <Box
          sx={{
            backgroundColor: 'rgba(0, 89, 255, 0.15)',
            border: '1px solid #0059ff',
            borderRadius: 1,
            padding: 2,
            textAlign: 'center',
            my: 2
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: 'Roboto Mono' }}>
            Voting closed: 23:59:59 UTC on April 30th, 2026
          </Typography>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Final Vote Readout
        </Typography>

        <Box
          sx={{
            my: 2,
            p: { xs: 1, sm: 2 },
            backgroundColor: 'rgba(0, 89, 255, 0.1)',
            border: '1px solid rgba(0, 89, 255, 0.5)',
            borderRadius: 2
          }}
        >
          <Box
            component="img"
            src="/assets/images/vote-results-readout.png"
            alt="Multi-page readout of final PoW versus PoS voting totals"
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: 1
            }}
          />
          <Typography variant="caption" component="p" sx={{ mt: 1 }}>
            Replace this placeholder image by uploading your final multi-page PNG to public/assets/images/vote-results-readout.png.
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', my: 3 }}>
          <Button
            component={RouterLink}
            to="/vote-rules"
            variant="outlined"
            sx={{
              fontFamily: 'Roboto Mono',
              fontWeight: 'bold',
              borderColor: '#0059ff',
              color: '#7ab3ff'
            }}
          >
            View Original Voting Rules (Archived)
          </Button>
        </Box>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Results
        </Typography>
        <Typography variant="body1" paragraph>
          Based on final tabulation, the community vote selected <strong>PoS (Proof of Stake)</strong> as the winning outcome.
        </Typography>
        <Typography variant="body1" paragraph>
          Implementation planning and transition details will be published in follow-up updates by the Core Contributor Team.
        </Typography>
      </Paper>
    </Container>
  );
}
