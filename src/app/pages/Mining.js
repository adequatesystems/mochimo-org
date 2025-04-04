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
  Stack,
  Button
} from '@mui/material';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import AppleIcon from '@mui/icons-material/Apple';
import LinuxIcon from '@mui/icons-material/Android';
import PoolIcon from '@mui/icons-material/GroupWork';
import PaymentIcon from '@mui/icons-material/Payment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HelpIcon from '@mui/icons-material/Help';

import DiscordIcon from '../icons/DiscordIcon';

export default function Mining() {
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
      description: 'A French-community driven mining pool with a focus on constant payouts and individual rig statistics tool.',
      discord: 'https://discord.gg/hcjZUVCnh7',
      icon: '/assets/images/mochipool-logo.png',
      supportedOS: ['Windows', 'Linux'],
      details: [
        { 
          icon: <LocationOnIcon />, 
          label: 'Location', 
          value: 'Switzerland (for improved data privacy)' 
        },
        { 
          icon: <PaymentIcon />, 
          label: 'Payouts', 
          value: 'Twice per week (Sunday and Wednesday)' 
        }
      ],
      howToJoin: {
        discordLink: 'https://discord.com/channels/1345166405263163464/1345167185567420448/1345174621648977991',
        description: 'Join the Discord server and follow the setup instructions in the #how-to-join channel.'
      }
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
          <Box sx={{ mb: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom align="center">
              Mining Mochimo
            </Typography>
          </Box>
          
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
                <ListItem 
                  alignItems="flex-start" 
                  sx={{ 
                    pr: pool.discord ? 8 : 2,
                    flexDirection: 'column'
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', pb: 2 }}>
                    <ListItemIcon sx={{ minWidth: { xs: '40px', sm: '56px' } }}>
                      {pool.icon ? (
                        <Avatar src={pool.icon} alt={`${pool.name} icon`} variant="rounded" />
                      ) : (
                        <PoolIcon />
                      )}
                    </ListItemIcon>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        <Link href={pool.url} target="_blank" rel="noopener">
                          {pool.name}
                        </Link>
                      </Typography>
                      <Typography component="span" variant="body2" color="text.primary">
                        Fee: {pool.fee}
                      </Typography>
                      <Typography variant="body2">
                        {pool.description}
                      </Typography>
                    </Box>
                    {pool.discord && (
                      <Box sx={{ ml: 2 }}>
                        <Tooltip title="Join Discord community" placement="left">
                          <IconButton 
                            component="a" 
                            href={pool.discord}
                            target="_blank"
                            rel="noopener"
                            sx={{ color: '#5865F2' }}
                          >
                            <DiscordIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                  </Box>
                  
                  {/* Pool Details */}
                  <Box sx={{ pl: { xs: 2, sm: 7 }, width: '100%' }}>
                    <Grid container spacing={2}>
                      {/* OS Support */}
                      <Grid item xs={12} sm={6}>
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
                      </Grid>
                      
                      {/* Additional Details */}
                      {pool.details && pool.details.map((detail, i) => (
                        <Grid item xs={12} sm={6} key={`detail-${i}`}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ mr: 1, color: 'primary.main' }}>
                              {detail.icon}
                            </Box>
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {detail.label}:
                              </Typography>
                              <Typography variant="body2">
                                {detail.value}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                      
                      {/* How to Join Section */}
                      {pool.howToJoin && (
                        <Grid item xs={12} sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <HelpIcon sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="body2" fontWeight="medium">
                              How to Join:
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ pl: 3 }}>
                            {pool.howToJoin.description}
                          </Typography>
                          {pool.howToJoin.discordLink && (
                            <Box sx={{ mt: 1, pl: 3 }}>
                              <Button
                                variant="outlined"
                                size="small"
                                startIcon={<DiscordIcon />}
                                href={pool.howToJoin.discordLink}
                                target="_blank"
                                rel="noopener"
                              >
                                Setup Instructions
                              </Button>
                            </Box>
                          )}
                        </Grid>
                      )}
                    </Grid>
                  </Box>
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
