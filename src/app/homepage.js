
import { useState } from 'react';
import { useGetBaseQuery, useGetChainQuery, useGetContributorsQuery } from 'api';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, AvatarGroup, Box, Button, CircularProgress, Container, Divider, Grid, Link, ListItem, ListItemIcon, ListItemText, Paper, Tooltip, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Address, Amount } from './component/Types';
import SuffixedValue from './component/SuffixedValue';
import RaisedCard from './component/RaisedCard';
import DiscordIcon from './icons/DiscordIcon';

function HomepageDivider ({ dense, ...props }) {
  return (
    <Divider sx={{ paddingTop: dense ? 4 : 8, paddingBottom: dense ? 2 : 4 }}>
      <Typography fontSize='1.25em' variant='caption' {...props} />
    </Divider>
  );
}

function HomepageAccordion ({ active, handleChange, panel, ...props }) {
  return (
    <Accordion
      elevation={5}
      expanded={active === panel}
      onChange={handleChange(panel)}
      {...props}
    />
  );
}

function HomepageAccordianSummary ({ alt, expandIcon, src, ...props }) {
  return (
    <AccordionSummary
      expandIcon={expandIcon !== null ? <ExpandMoreIcon /> : null} sx={{
        display: 'flex', flexDirection: 'row', alignItems: 'middle'
      }}
    >
      <ListItem>
        <ListItemIcon><img alt={alt} src={src} /></ListItemIcon>
        <ListItemText {...props} />
      </ListItem>
    </AccordionSummary>
  );
}

export default function Homepage () {
  const remainingInstamine = 'de77cd98749f9ed61662a09cdf59db622ae8150ea2b9ec35d15c4bd5f204822a';
  const base = useGetBaseQuery();
  const chain = useGetChainQuery();
  const contributors = useGetContributorsQuery(
    { owner: 'mochimodev', repo: 'mochimo' });

  const [active, setActive] = useState(false);
  const handleChange = (panel) => (_event, isActive) => {
    setActive(isActive ? panel : false);
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      <Container
        sx={{
          gap: '1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          paddingTop: { xs: '2rem', sm: '3rem' },
          paddingBottom: '2rem',
          textAlign: 'center',
          textShadow: '0 0 0.125em black, 0 0 0.25em black, 0 0 0.5em black',
          pointerEvents: 'none'
        }}
      >
        <Typography lineHeight={1.5} variant='caption' fontSize='1em' sx={{pointerEvents: 'auto'}}>
          <Typography variant='h4' fontFamily='Nunito Sans' fontWeight='bold'>
            Mochimo Cryptocurrency Network
          </Typography>
          The world's first completely quantum resistant cryptocurrency.
          <Typography variant='caption' fontSize='0.9em' display='block' sx={{ marginTop: 1 }}>
            Est. 2018
          </Typography>
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            pointerEvents: 'auto',
            gap: ({ spacing }) => spacing(1)
          }}
        />
      </Container>
      <Container
        sx={{
          zIndex: 1,
          position: 'relative'
        }}
      >
        <Paper
          sx={{
            zIndex: -1,
            position: 'absolute',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            width: '400%',
            height: '100%',
            left: '-150%',
            top: ({ spacing }) => spacing(16),
            boxShadow: '0 0 0em 6px #2e2e2e'
          }}
        />
        <HomepageDivider dense>Mochimo's Focus</HomepageDivider>
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={12}>
            <RaisedCard>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={2} align='center'>
                  <Avatar
                    variant='square' src='/assets/icons/quantum-computing.png'
                    sx={{ justifyContent: 'center', width: 64, height: 64, margin: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant='h6'>Quantum Resistance</Typography>
                  <Typography>
                    Quantum Computing is poised to break Bitcoin and Ethereum without warning. Mochimo uses the WOTS+ algorithm for its wallets, securing them against any Quantum computing attack.
                  </Typography>
                </Grid>
              </Grid>
            </RaisedCard>
          </Grid>
          <Grid item xs={12}>
            <RaisedCard>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={2} align='center'>
                  <Avatar
                    variant='square' src='/assets/icons/decentralized.png'
                    sx={{ justifyContent: 'center', width: 64, height: 64, margin: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant='h6'>Decentralization & Fair Mining</Typography>
                  <Typography>
                    Decentralization is everything.  Mochimo is a Proof-of-Work (PoW) system like Bitcoin, but our coins are only mined by GPUs.   There are no trusted nodes or central authority, not even the Core Team. Every node operator is equal on the network, including you!
                  </Typography>
                </Grid>
              </Grid>
            </RaisedCard>
          </Grid>
          <Grid item xs={12}>
            <RaisedCard>
              <Grid container spacing={2} alignItems='center'>
                <Grid item xs={12} sm={2} align='center'>
                  <Avatar
                    variant='square' src='/assets/icons/fast-charge.png'
                    sx={{ justifyContent: 'center', width: 64, height: 64, margin: 'auto' }}
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography variant='h6'>Fast!</Typography>
                  <Typography>
                    Mochimo has one of the best block times for a PoW network.  Our nodes start fast, converge fast, and process transactions quickly!
                  </Typography>
                </Grid>
              </Grid>
            </RaisedCard>
          </Grid>
        </Grid>
        <HomepageDivider>Mochimo Innovations</HomepageDivider>
        <Grid
          container spacing={2} justifyContent='center' sx={{
            backgroundImage: 'url(/assets/backgrounds/john-adams-1xIN4FMR78A-unsplash.jpg)',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 4em 4em #1e1e1e'
          }}
        >
          <Grid
            item xs={12} sm={10} md={8} align='center' sx={{
              backgroundColor: 'rgba(30, 30, 30, 0.75)',
              borderBottomLeftRadius: '50%',
              borderBottomRightRadius: '50%',
              boxShadow: '0 4em 2em 2em rgba(30, 30, 30, 0.75)'
            }}
          >
            The extensive history of updates and improvements to the
            Mochimo Cryptocurrency Engine is always accesible from Mochimo's&nbsp;
            <Tooltip title='Extensive History' placement='top' arrow>
              <Link href='https://github.com/mochimodev/mochimo'>
                Github Repository
              </Link>
            </Tooltip>
            <br /><br />
            In addition, here are some of the novel innovations that set
            Mochimo apart...
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
          <HomepageAccordion {...{ active, handleChange, panel: 'crunch' }}>
            <HomepageAccordianSummary
                alt='compress icon'
                src='/assets/icons/compress.png'
              >ChainCrunch™ Compression
              </HomepageAccordianSummary>
              <AccordionDetails>
                With the size of many blockchains growing uncontrollably, and
                some already exceeding 1TB in size, scalability still remains a
                priority issue. Mochimo uses a proprietary compression algorithm
                called ChainCrunch™, which solves this issue without compromising
                on blockchain integrity.
                <br /><br />
                At almost 4 years of age and more than 670k blocks, the
                core component used to verify the integrity of the Blockchain is
                a mere 50MB in size. A full node need only download an additional
                and tiny, compressed portion of the historical blockchain and
                begin contributing to the network immediately.
              </AccordionDetails>
            </HomepageAccordion>
            <HomepageAccordion {...{ active, handleChange, panel: 'pseudo' }}>
              <HomepageAccordianSummary
                alt='pseudoblock icon'
                src='/assets/icons/pseudoblock.png'
              >Pseudo-block Failsafe
              </HomepageAccordianSummary>
              <AccordionDetails>
                What happens when a large portion power suddenly disappears from
                the network? With the remaining power left to solve tremendously
                high difficulties in order to clear transactions, how long should
                you wait? Days? WEEKS? MoNtHs? Not around these parts...
                <br /><br />
                The Mochimo network detects long block times and agrees to lower
                the difficulty with a special kind of block. The "pseudo-block".
                With the power of friendship (and of course, a little "pseudo"
                blockchain magic), the Mochimo network restores normal clearing
                times to transactions within hours of a 90% mining power loss.
              </AccordionDetails>
            </HomepageAccordion>
            <HomepageAccordion {...{ active, handleChange, panel: '3way' }}>
              <HomepageAccordianSummary
                alt='handshake icon'
                src='/assets/icons/handshake.png'
              >Three-Way Handshake
              </HomepageAccordianSummary>
              <AccordionDetails>
                The Three-Way handshake is a network communication protocol
                requiring the collection of "acknowledgements" providing fast,
                simple and disposable security for secure requests to the
                decentralized network of nodes that make up the Mochimo Network.
              </AccordionDetails>
            </HomepageAccordion>
            <HomepageAccordion {...{ active, handleChange, panel: 'haiku' }}>
              <HomepageAccordianSummary
                alt='poetry icon'
                src='/assets/icons/poetry.png'
              >Haiku of the Blockchain
              </HomepageAccordianSummary>
              <AccordionDetails>
                In the beginning, there was a single Haiku...
                <ListItemText inset>
                  <Typography lineHeight={1} fontFamily='Redressed' fontSize='1.5em'>
                    above day<br />a journey<br />walking
                  </Typography>
                </ListItemText>
                ... and now there are hundreds of thousands of Haiku baked into
                each and every single block. Not only are they great to look at,
                it is a requirement of blockchain validity that the nonce used
                to solve a block originates from a syntactically correct Haiku.
                <br /><br />
                With nearly 5 Trillion possible combinations of possible Haiku,
                Mochimo is a gold mine of poetry.
                <ListItemText inset>
                  <Typography lineHeight={1} fontFamily='Redressed' fontSize='1.5em'>
                    {(chain.isFetching && (<CircularProgress />)) || (
                      chain.data?.haiku?.split(' \n').map((line, i) => (
                        <span key={`latest-haiku-line-${i}`}>{line}<br /></span>
                      ))
                    )}
                  </Typography>
                </ListItemText>
              </AccordionDetails>
            </HomepageAccordion>
            <HomepageAccordion {...{ active, handleChange, panel: 'tag' }}>
              <HomepageAccordianSummary
                alt='tag icon'
                src='/assets/icons/tag.png'
              >Quantum Resistant Addresses
              </HomepageAccordianSummary>
              <AccordionDetails>
                Address size is one of the major hurdles with Quantum Resistant
                public keys. At 2208 bytes, it's
                more than a handful to remember or to share. Fortunately, Mochimo deploys 
                a custom tagging feature that automatically generates an address from the very 
                first quantum resistant public key ever used. This address will never change, 
                even if the public keys change.
                This allows enormous public keys to be "tagged" with a short and easily memorable address
                of a mere 20 bytes in length. The official way of sharing these 20 bytes follows the Bitcoin standard 
                of using base58, and including a crc16 checksum at the end.
              </AccordionDetails>
            </HomepageAccordion>
            <HomepageAccordion {...{ active, handleChange, panel: 'peach' }}>
              <HomepageAccordianSummary
                alt='MCM gpu icon'
                src='/assets/icons/gpu-mcm.png'
              >FPGA-Tough POW
              </HomepageAccordianSummary>
              <AccordionDetails>
                Dubbed "The Peach Algorithm", Mochimo uses a unique "FPGA-Tough"
                Proof of Work mining algorithm, that is specifically designed to
                shift the value of mining in favor of miners with Gaming GPUs.
                <br /><br />
                The Peach algorithm a standard arrangement of hashing algorithms,
                memory transformations, and deterministic FLOPs as the first layer
                of "FPGA Tough"-ness. This layer is further supported by a minimum
                VRAM requirement that gives a considerable "mining advantage" to
                hardware (notably GPUs) with the ability to cache a large sparse
                matrix of pre-computed data unique to each block.
                <br /><br />
                Ultimately, the few FPGAs with access to this "mining advantage"
                are likely to be eclipsed by Gaming GPUs in terms of value.
              </AccordionDetails>
            </HomepageAccordion>
          </Grid>
        </Grid>
        <HomepageDivider>The Team</HomepageDivider>
        <Grid
          container spacing={2} justifyContent='center' sx={{
            backgroundImage: 'url(/assets/backgrounds/conny-schneider-xuTJZ7uD7PI-unsplash.jpg)',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            boxShadow: 'inset 0 0 4em 4em #1e1e1e'
          }}
        >
          <Grid item xs={12} sm={10} md={8} align='center'>
            <Typography variant='h4' gutterBottom>
              Github Contributors
            </Typography>
            {(contributors.isFetching & (<CircularProgress />)) || (
              <AvatarGroup max={contributors.data?.length} sx={{ justifyContent: 'center' }}>
                {(contributors.data?.map((contrib, i) => (
                  <Tooltip
                    key={`contributor-${i}`} title={contrib.login}
                    placement='bottom' arrow
                  >
                    <Avatar
                      component='a'
                      alt={contrib.login}
                      src={contrib.avatar_url}
                      href={contrib.html_url}
                    />
                  </Tooltip>
                )))}
              </AvatarGroup>
            )}
          </Grid>
          <Grid item xs={12} sm={10} md={6} align='left'>
            <RaisedCard sx={{ height: '100%' }}>
              <Typography variant='h4' gutterBottom>
                Core Contributors
              </Typography>
              <Typography>
                Mochimo's core contributors is comprised of industry leaders in
                the fields of computer networking, artificial intelligence,
                telecommunications, cryptography and software engineering.
                Though the majority of it's members wish to remain anonymous,
                you can see some of the core contributors.&emsp;
                <Tooltip title="They're friendly" placement='top' arrow>
                  <Link to='/meet-the-team'>Meet The Team &#187;</Link>
                </Tooltip>
              </Typography>
            </RaisedCard>
          </Grid>
          <Grid item xs={12} sm={10} md={6} align='right'>
            <RaisedCard sx={{ height: '100%' }}>
              <Typography variant='h4' gutterBottom>
                Interested in Contributing?
              </Typography>
              <Typography>
                Core Contributors are selected based on recommendation, or via
                recognition of invaluable contributions to the project. If you
                wish to contribute to Mochimo, Pull Requests are always open.
                If you wish to discuss something specific, please reach out to
                the active community on&nbsp;
                <Link href='https://discord.mochimo.org/'>
                  Discord
                </Link>, or&nbsp;
                <Link href='mailto:support@mochimo.org'>
                  contact support
                </Link> with your inquiries.
              </Typography>
            </RaisedCard>
          </Grid>
        </Grid>
      </Container>
      <Container align='center' sx={{ marginTop: 12, marginBottom: 4 }}>
        <Typography variant='h4' gutterBottom align='center'>
          Frequently Asked Questions
        </Typography>
        <Typography variant='body1' gutterBottom align='center' sx={{ marginBottom: 2 }}>
          Have questions about Mochimo? We have answers!
        </Typography>
        <Box align='center'>
          <Link to='/faq' underline='none'>
            <Button variant='contained' size='large'>
              View All FAQs
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
