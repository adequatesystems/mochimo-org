import { useEffect } from 'react';
import { Box, Button, CircularProgress, Container, Link, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';

import { scrollToTopNow } from '../component/ScrollToTop';
import { Address, Amount } from '../component/Types';
import DiscordIcon from '../icons/DiscordIcon';
import { useGetChainQuery } from 'api';
import { WebWallet } from 'links';
import { Reveal, GlassPanel, PageHero } from '../component/Section';
import { tokens, mono } from 'theme';

const REMAINING_INSTAMINE = 'de77cd98749f9ed61662a09cdf59db622ae8150ea2b9ec35d15c4bd5f204822a';

function Card ({ question, children }) {
  return (
    <GlassPanel hover sx={{ p: { xs: 2.75, md: 3.25 } }}>
      <Typography
        variant='h6'
        sx={{ fontSize: '1.125rem', mb: 1.75, color: tokens.text, lineHeight: 1.4 }}
      >{question}
      </Typography>
      <Box
        sx={{
          color: tokens.textDim,
          fontSize: '0.875rem',
          lineHeight: 1.72,
          '& strong': { color: tokens.text },
          '& ol, & ul': { pl: 2.5, my: 1 },
          '& li': { mb: 0.75 }
        }}
      >{children}
      </Box>
    </GlassPanel>
  );
}

export default function FAQ () {
  const chain = useGetChainQuery();

  useEffect(() => scrollToTopNow(), []);

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageHero title='Frequently Asked Questions' lede='Supply, launch history, quantum resistance, proof of stake, and storage.' />

      <Reveal delay={80}>
        <Masonry columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2.5} sx={{ margin: 0 }}>
          <Card question='Does Mochimo run on proof of stake?'>
            Yes. Mochimo now runs on proof of stake. Mining and proof of work
            are retired, and more resources about proof of stake are coming
            soon. WOTS+ signatures do not change.
            <br /><br />
            Read more on the{' '}
            <Link component={RouterLink} to='/mining'>Proof of Stake page</Link>,
            and how the community voted on the{' '}
            <Link component={RouterLink} to='/vote'>vote page</Link>.
          </Card>

          <Card question="What's the supply statistics?">
            Mochimo's supply is fairly simply split into 2 categories.
            <ol>
              <li>
                <strong>Instamine Supply (<Amount value='4757066000000000' />)</strong>
                <br />
                The Instamine (not to be confused with a "premine") existed as a
                single ledger entry of Mochimo's Genesis Block. This instamine
                was split into its predetermined allocations during the early
                days of the Blockchain.
                <br /><br />
                <Address href short wots={REMAINING_INSTAMINE} /> currently holds
                the largest remainder of the instamine, which is controlled by
                the Mochimo Foundation, and was locked by contractual agreement
                until 25th June 2023.
              </li>
              <br />
              <li>
                <strong>
                  Mineable Supply (
                  {(chain.isFetching && (<span> <CircularProgress size='1em' /> </span>)) || (
                    <Amount value={((chain.data?.maxsupply || 76493180.0616804) * 1e+9) - 4757066000000000} />
                  )})
                </strong>
                <br />
                Under proof of work, the mineable supply was the Mochimo
                rewarded to a "miner" for solving a block on the Blockchain. The
                distribution of these rewards over the life of the Mochimo
                Blockchain is explained and illustrated in a fantastic&nbsp;
                <Link href='https://medium.com/mochimo-official/of-time-and-tide-the-mochimo-cryptocurrency-emission-curve-9bbe30b9b02e' target='_blank' rel='noopener noreferrer'>
                  Medium Article
                </Link>.
                <br />
                In summary...
                <ul>
                  <li>Reward (@ 0x01): <Amount value={5000000000} /></li>
                  <ul><li> +<Amount value={56000} /> / block</li></ul>
                  <li>Reward (@ 0x4321): <Amount value={5917392000} /></li>
                  <ul><li> +<Amount value={150000} /> / block</li></ul>
                  <li>Reward (@ 0x5B402): <Amount value={59523942000} /></li>
                  <ul><li> -<Amount value={28488} /> / block</li></ul>
                  <li>Reward (@ 0x200000): <Amount value={0} /></li>
                  <ul><li>mining distribution finalized</li></ul>
                  <ul><li>txfees sustain network</li></ul>
                </ul>
                This schedule applied under proof of work. Mining is now retired, and the network runs on proof of stake.
              </li>
            </ol>
          </Card>

          <Card question='How is the Instamine used?'>
            The majority of the Instamine was allocated to the original Mochimo
            Development Team. The team spent years creating a cryptocurrency
            platform that solves almost every major issue with Bitcoin to date.
            Therefore, this allocation serves as a fee (in MCM) for that work.
            <br /><br />
            For the extended breakdown of Instamine distribution...
            <br /><br />
            <strong>Mochimo Foundation (<Amount value={1557066000000000} />):</strong>{' '}
            these funds are used at the discretion of the foundation for
            marketing costs, bounties, and ongoing support of the network.
            <br /><br />
            <strong>Matt Zweil (<Amount value={1919999999991500} />):</strong>{' '}
            Mochimo's founder, architect, and only remaining Development Team
            member whose coins remain controlled by The Mochimo Foundation.
            These coins were locked until 25th June 2023, exactly 5 years from
            the launch date of Mochimo.
            <br /><br />
            <strong>Development Team (<Amount value={1280000000008000} />):</strong>{' '}
            effective 25th June 2019, the original 2-year lock on the Developer
            Team coins has expired. The coins and their intended sale dates are
            no longer tracked or listed on the Mochimo Wiki, as they are now
            privately controlled and considered a part of the circulating supply.
          </Card>

          <Card question='When was the first block solved?'>
            As per Blockchain data pulled directly from the network nodes, the
            first block was solved on Monday, June 25, 2018 3:43:45 PM, or
            2018-06-25T15:43:45+00:00 (ISO timestamp).
          </Card>

          <Card question='Did Mochimo have an ICO or other pre-Mainnet investment phase?'>
            No. The decision to forego any sort of pre-launch investment in the
            coin was made to avoid the legal and regulatory issues that would
            have arisen. Furthermore,&nbsp;
            <Link href='https://discord.com/channels/460867662977695765/512709057497530369/606879821548617737' target='_blank' rel='noopener noreferrer'>
              Mochimo is money...
            </Link>
          </Card>

          <Card question='Do I need the blockchain history to transact directly with the network?'>
            No. Somewhat importantly, performing a transaction on the Mochimo
            Network DOES NOT require access to the blockchain. This allows
            Wallets, Exchanges, Third-Party Applications and Payment Providers
            to swiftly operate on the network without pre-requisite access to
            the blockchain.
          </Card>

          <Card question='How did you implement quantum resistance, anyhow?'>
            We checked out the algorithms that were peer reviewed and
            acknowledged by the EU backed Quantum Research group PQCRYPTO and
            chose the WOTS+ algorithm. We then wrote and vetted our quantum code
            with the algorithm's originator: Andreas Hülsing. The penalty of
            adopting quantum signatures is their size, but we've already solved
            that problem with our ChainCrunch™ tech.
          </Card>

          <Card question='How long does it take to set up a Mochimo node?'>
            Several minutes on high performance hardware, but it is known to
            take around 20 minutes on tiny 1vCPU server nodes.
          </Card>

          <Card question='Where do I store my MCM?'>
            For now, MCM can be stored in the{' '}
            <Link href={WebWallet.href} target='_blank' rel='noopener noreferrer'>Mochimo Wallet Chrome extension</Link>{' '}
            or in the Mochimo mobile wallets.
          </Card>

          <Card question='What exchanges are you on?'>
            The list of exchanges that Mochimo is currently on can be found on
            the MCM Exchanges page. Regularly check back in Discord and the
            exchange page for updates.
          </Card>
        </Masonry>
      </Reveal>

      <Reveal delay={120}>
        <GlassPanel
          sx={{
            mt: { xs: 5, md: 7 },
            p: { xs: 4, md: 6 },
            textAlign: 'left',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 3
          }}
        >
          <Box>
            <Typography
              variant='h3'
              sx={{ fontSize: { xs: '1.7rem', md: '2.3rem' }, mb: 1.25 }}
            >Need more answers about Mochimo?
            </Typography>
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: '0.8125rem',
                letterSpacing: '0.1em',
                color: tokens.textDim
              }}
            >Come join the community
            </Typography>
          </Box>
          <Button
            variant='contained' size='large'
            href='https://discord.mochimo.org/'
            target='_blank' rel='noopener noreferrer'
            startIcon={<DiscordIcon />}
          >Mochimo Official Discord
          </Button>
        </GlassPanel>
      </Reveal>
    </Container>
  );
}
