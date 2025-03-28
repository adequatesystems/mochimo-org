import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Avatar,
  Chip,
  Stack
} from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from '@mui/icons-material/Android';
import PoolIcon from '@mui/icons-material/GroupWork';

import PageTitle from '../component/PageTitle';
import DiscordIcon from '../icons/DiscordIcon';

export default function Mining() {
  console.log('Mining component rendered'); // Debug message

  // OS Icons mapping for reuse
  const osIcons = {
    Windows: <DesktopWindowsIcon fontSize="small" />,
    Linux: <LinuxIcon fontSize="small" />,
    MacOS: <AppleIcon fontSize="small" />
  };

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
      description: 'Build from source for maximum performance on Linux',
      link: 'https://github.com/mochimodev/mochimo/releases/tag/v3.0.3',
      instructions: 'Extract mcmminer-v3.0.3.ubuntu.cuda-12.8-570.86.10.tar.gz and run it.'
    }
  ];

  const miningPools = [
    {
      name: 'MochiPool',
      url: 'https://mochimodash.ddns.net/d/beeckp9iv0b9cd/mochipool',
      fee: '10%',
      description: 'A french-community driven mining pool with focus to constant payouts and individual rig statistics tool. Mining with Linux or on Windows (with WSL).',
      discord: 'https://discord.gg/hcjZUVCnh7',
      icon: '/assets/icons/mochipool-icon.png',
      supportedOS: ['Windows', 'Linux']
    },
    {
      name: 'MCM Pool',
      url: 'https://mcmpool.eu',
      fee: '0.9%',
      description: 'European-based mining pool with low latency for EU miners. Supports all major operating systems.',
      discord: 'https://discord.gg/sXEHnJGcbz',
      supportedOS: ['Windows', 'Linux', 'MacOS']
    },
    {
      name: 'Mochi Express',
      url: 'https://mochiexpress.net',
      fee: '1%',
      description: 'Fast payouts with detailed mining statistics. Windows and Linux miners available.',
      discord: 'https://discord.gg/mochimo',
      supportedOS: ['Windows', 'Linux']
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container maxWidth="lg" sx={{ 
        mt: 4, 
        mb: 8,
        position: 'relative',
        zIndex: 1
      }}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 4,
            backgroundColor: 'rgba(30, 30, 30, 0.85)',
            position: 'relative',
            boxShadow: ({ palette }) => '0 0 2em ' + palette.background.default
          }}
        >
          <PageTitle title="Mining Mochimo" />
          
          <Typography variant="h4" component="h2" gutterBottom>
            Getting Started with Mining
          </Typography>
          <Typography paragraph>
            Mochimo uses a unique mining algorithm called Mochimo-Peach algorithm that is FPGA-resistant
            and can be efficiently mined on accessible consumer GPUs. You can mine Mochimo either by
            solo mining or by joining a mining pool.
          </Typography>
        </Paper>
        
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginBottom: 4,
            backgroundColor: 'rgba(30, 30, 30, 0.85)',
            position: 'relative'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom id="solo-mining">
            Solo Mining Setup
          </Typography>
          <Typography paragraph>
            Solo mining allows you to mine directly on the Mochimo network without joining a pool.
            While solo mining rewards are less frequent, you receive the full block reward when you
            successfully mine a block.
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 6 }}>
            {soloMiners.map((miner, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', backgroundColor: 'rgba(48, 48, 48, 0.9)' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Box mr={1}>{miner.icon}</Box>
                      <Typography variant="h6">{miner.platform}</Typography>
                    </Box>
                    <Typography variant="body2" paragraph>
                      {miner.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {miner.instructions}
                    </Typography>
                    <Link href={miner.link} target="_blank" rel="noopener">
                      Download {miner.platform} Miner
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
        
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            backgroundColor: 'rgba(30, 30, 30, 0.85)',
            position: 'relative'
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom id="mining-pools">
            Mining Pools
          </Typography>
          <Typography paragraph>
            Mining pools combine the computing power of multiple miners to increase the chance of
            finding blocks. Rewards are distributed among participants based on their contributed hashrate.
            Joining a pool provides more consistent rewards compared to solo mining.
          </Typography>
          
          <List sx={{ backgroundColor: 'rgba(48, 48, 48, 0.6)', borderRadius: 1, padding: 2 }}>
            {miningPools.map((pool, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start" sx={{ pr: pool.discord ? 8 : 2 }}>
                  <ListItemIcon>
                    {pool.icon ? (
                      <Avatar src={pool.icon} alt={`${pool.name} icon`} variant="rounded" />
                    ) : (
                      <PoolIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6">
                        <Link href={pool.url} target="_blank" rel="noopener">
                          {pool.name}
                        </Link>
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="text.primary">
                          Fee: {pool.fee}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {pool.description}
                        </Typography>
                        
                        {/* OS Support Section */}
                        <Box sx={{ mt: 1 }}>
                          <Typography component="span" variant="body2" color="text.secondary">
                            Supported OS:
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                            {pool.supportedOS && pool.supportedOS.map((os) => (
                              <Chip
                                key={os}
                                icon={osIcons[os]}
                                label={os}
                                size="small"
                                variant="outlined"
                                sx={{
                                  borderColor: 'rgba(255, 255, 255, 0.3)',
                                  '& .MuiChip-icon': {
                                    color: 'inherit'
                                  }
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </React.Fragment>
                    }
                  />
                  {pool.discord && (
                    <ListItemSecondaryAction>
                      <Tooltip title="Join Discord community" placement="left">
                        <IconButton 
                          edge="end" 
                          component="a" 
                          href={pool.discord}
                          target="_blank"
                          rel="noopener"
                          sx={{ color: '#5865F2' }}
                        >
                          <DiscordIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  )}
                </ListItem>
                {index < miningPools.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
