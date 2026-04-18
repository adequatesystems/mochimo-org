import { useEffect } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { scrollToTopNow } from '../component/ScrollToTop';

export default function Vote() {
  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          background: 'linear-gradient(90deg, #00c853 0%, #00e676 50%, #00c853 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradientShift 3s ease infinite',
          '@keyframes gradientShift': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' }
          },
          color: 'white',
          padding: 2,
          borderRadius: 2,
          textAlign: 'center',
          marginTop: 4,
          marginBottom: 3,
          boxShadow: '0 4px 12px rgba(0, 200, 83, 0.4)'
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Roboto Mono',
            fontWeight: 'bold'
          }}
        >
          VOTING IS NOW OPEN
        </Typography>
      </Box>

      <Typography variant='h2' align='center' gutterBottom sx={{ marginBottom: 4 }}>
        PoW-PoS On-Chain Voting
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
          After a lot of community discussion over the years, the Core Contributor Team is asking for your help in choosing the future of the Mochimo network's consensus algorithm.
        </Typography>

        <Typography variant="body1" paragraph>
          To do this we will be holding an on-chain vote that all holders can participate in.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          The Question
        </Typography>
        <Typography variant="body1" paragraph>
          Do you want the Mochimo network to remain <strong>PoW</strong> (Proof of Work, mined by GPU miners) or do you want Mochimo to migrate to a <strong>PoS</strong> (Proof of Stake, where validator nodes confirm transactions and individual holders can stake their coins for staking rewards)?
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          How to Vote
        </Typography>
        <Typography variant="body1" paragraph>
          In order to answer this question, each person who desires to vote must send a single transaction to the official MCM voting address:
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
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Roboto Mono',
              wordBreak: 'break-all'
            }}
          >
            c2QVMZKC1KyQq84VVQc32sniKQhB6e
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', my: 2 }}>
          <Button
            variant="contained"
            href="https://mochiscan.org/address/0x810b82c44efb657ad4cc7937578668b19e985e72"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontFamily: 'Roboto Mono',
              fontWeight: 'bold',
              backgroundColor: '#0059ff',
              '&:hover': {
                backgroundColor: '#0046cc'
              }
            }}
          >
            Click Here to See Recent Votes
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: 'rgba(255, 152, 0, 0.15)',
            border: '1px solid #ff9800',
            borderRadius: 1,
            padding: 2,
            textAlign: 'center',
            my: 2
          }}
        >
          <Typography variant="h6" sx={{ fontFamily: 'Roboto Mono', color: '#ff9800' }}>
            Voting closes: 23:59:59 UTC on April 30th, 2026
          </Typography>
        </Box>

        <Typography variant="body1" paragraph>
          Send the smallest amount the network will accept which is <strong>0.000000501 MCM</strong>, and add a memo field with either the word <strong>POW</strong> or <strong>POS</strong> in it.
        </Typography>

        <Typography variant="body1" paragraph>
          The memo represents the network type you want to have in the future. If you want to migrate to PoS for example, enter <strong>POS</strong> in the memo field.
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Voting Rules
        </Typography>
        <Typography variant="body1" component="div">
          <ul>
            <li>Only the first vote transaction received from each address with a proper memo string included (either "POW" or "POS") will count.</li>
            <li>Please don't vote multiple times.</li>
            <li>To prevent any coin shuffling double-voting shenanigans, on May 1st we will check each address with either a POW or POS vote transaction.</li>
            <li>Whatever that address balance shows on May 1st is how many votes will be credited to either PoS or PoW.</li>
          </ul>
        </Typography>

        <Typography variant="h5" gutterBottom sx={{ mt: 3 }}>
          Results
        </Typography>
        <Typography variant="body1" paragraph>
          Vote results will be tabulated and presented on this page late on May 1st.
        </Typography>
      </Paper>
    </Container>
  );
}
