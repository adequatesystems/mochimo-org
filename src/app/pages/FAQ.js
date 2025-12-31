import { useEffect } from 'react';
import { Container, Link, Typography, CircularProgress, Button, Paper } from '@mui/material';
import { Masonry } from '@mui/lab';
import { scrollToTopNow } from '../component/ScrollToTop';
import RaisedCard from '../component/RaisedCard';
import { Address, Amount } from '../component/Types';
import DiscordIcon from '../icons/DiscordIcon';
import { useGetChainQuery } from 'api';

export default function FAQ() {
  const remainingInstamine = 'de77cd98749f9ed61662a09cdf59db622ae8150ea2b9ec35d15c4bd5f204822a';
  const chain = useGetChainQuery();

  useEffect(() => scrollToTopNow(), []);

  return (
    <Container>
      <Typography variant='h2' align='center' gutterBottom sx={{ marginTop: 4, marginBottom: 4 }}>
        Frequently Asked Questions
      </Typography>
      <Masonry
        columns={{ sm: 1, md: 2, lg: 3 }} spacing={2} sx={{
          boxShadow: 'inset 0 0 4em 4em #1e1e1e',
          background: 'black',
          margin: 0
        }}
      >
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            What's the supply statistics?
          </Typography>
          Mochimo's supply is fairly simply split into 2 categories.
          <ol>
            <li>
              <strong>
                Instamine Supply (<Amount value='4757066000000000' />)
              </strong><br />
              The Instamine (not to be confused with a "premine") existed
              as a single ledger entry of Mochimo's Genesis Block. This
              instamine was split into it's predetermined allocations
              during the early days of the Blockchain.<br /><br />
              <Address href short wots={remainingInstamine} /> currently
              holds the largest remainder of the instamine, which is
              controlled by the Mochimo Foundation, and is LOCKED by
              contractual agreement until 25th June 2023.
            </li>
            <br />
            <li>
              <strong>
                Mineable Supply (
                {(chain.isFetching && (
                  <span> <CircularProgress size='1em' /> </span>
                )) || (
                  /* realtime "max supply" minus "instamine" */
                  <Amount value={((chain.data?.maxsupply || 76493180.0616804) * 1e+9) - 4757066000000000} />
                )})
              </strong><br />
              The Mineable supply can be described simply as Mochimo
              that is rewarded to a "miner" for solving a block on the
              Blockchain. The distribution of these rewards over the
              life of the Mochimo Blockchain is explained and illustrated
              in a fantastic&nbsp;
              <Link href='https://medium.com/mochimo-official/of-time-and-tide-the-mochimo-cryptocurrency-emission-curve-9bbe30b9b02e'>
                Medium Article
              </Link>.<br />
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
            </li>
          </ol>
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            How is the Instamine used?
          </Typography>
          The majority of the Instamine was allocated to the original
          Mochimo Development Team. The team spent years creating a
          cryptocurrency platform that solves almost every major issue
          with Bitcoin to date. Therefore, this allocation serves as a
          fee (in MCM) for that work. The fee is equal to approximately
          4.46% of the fully diluted Mochimo supply.
          <br /><br />
          For the extended breakdown of Instamine distribution...
          <br /><br />
          <strong>
            Mochimo Foundation (<Amount value={1557066000000000} />):
          </strong> these funds are used at the discretion of the
          foundation for marketing costs, bounties, and ongoing support
          of the network.
          <br /><br />
          <strong>
            Matt Zweil (<Amount value={1919999999991500} />):
          </strong> Mochimo's founder, architect, and only remaining
          Development Team member whose coins remain controlled by The
          Mochimo Foundation. These coins are LOCKED until 25th June 2023,
          exactly 5 years from the launch date of Mochimo.
          <br /><br />
          <strong>
            Development Team (<Amount value={1280000000008000} />):
          </strong> effective 25th June 2019, the original 2-year lock
          on the Developer Team coins has expired. The coins and their
          intended sale dates are no longer tracked or listed on the
          Mochimo Wiki, as they are now privately controlled and
          considered apart of the circulating supply.
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            When was the first block solved?
          </Typography>
          As per Blockchain data pulled directly from the network nodes,
          the first block was solved on Monday, June 25, 2018 3:43:45 PM,
          or 2018-06-18T15:43:45+00:00 (ISO timestamp).
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            Did Mochimo have an ICO or other pre-Mainet investment phase?
          </Typography>
          No. The decision to forego any sort of pre–launch investment
          in the coin was made to avoid the legal and regulatory issues
          that would have arisen. Furthermore,&nbsp;
          <Link href='https://discord.com/channels/460867662977695765/512709057497530369/606879821548617737'>
            Mochimo is money...
          </Link>
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            Do I need the blockchain history to transact directly with
            the network?
          </Typography>
          No. Somewhat importantly, performing a transaction on the
          Mochimo Network DOES NOT require access to the blockchain.
          This allows Wallets, Exchanges, Third-Party Applications and
          Payment Providers to swiftly operate on the network without
          pre-requisite access to the blockchain.
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            How did you implement quantum resistance, anyhow?
          </Typography>
          We checked out the algorithms that were peer reviewed and
          acknowledged by the EU backed Quantum Research group PQCRYPTO
          and chose the WOTS+ algorithm. We then wrote and vetted our
          quantum code with the algorithm's originator: Andreas Hülsing.
          The penalty of adopting quantum signatures is their size, but
          we've already solved that problem with our ChainCrunch™ tech.
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            How long does it take to set up a Mochimo mining node?
          </Typography>
          Several minutes on high performance hardware, but it is known
          to take around 20 minutes on tiny 1vCPU server nodes.
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            Where do I store my MCM?
          </Typography>
          Mochimo can currently be stored in the cross-platform "Mojo"
          wallet, with Mobile / Web Wallets, and hardware wallet
          integrations in the works...
        </RaisedCard>
        <RaisedCard>
          <Typography fontWeight='bold' variant='h6' gutterBottom>
            What exchanges are you on?
          </Typography>
          The list of exchanges that Mochimo is currently on can be found
          on the MCM Exchanges page. Regularly check back in Discord and
          the exchange page for updates.
        </RaisedCard>
      </Masonry>
      <Paper
        align='center' sx={{
          zIndex: 1,
          position: 'relative',
          padding: 2,
          marginTop: 4,
          marginBottom: 4,
          background: '#121212'
        }}
      >
        <Typography variant='h2' gutterBottom>
          Need more answers about Mochimo?
        </Typography>
        <Typography display='block' variant='caption' gutterBottom>
          Come join the community
        </Typography>
        <Button variant='contained' href='https://discord.mochimo.org/'>
          <DiscordIcon />&emsp;Mochimo Official Discord
        </Button>
      </Paper>
    </Container>
  );
}
