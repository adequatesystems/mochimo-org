
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Link, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { keyframes } from '@emotion/react';
import { PageHero } from './component/Section';
import { tokens, display, mono } from 'theme';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`;

const SKELETON_SX = {
  bgcolor: tokens.base,
  animation: `${pulse} 1.6s ease-in-out infinite`,
  '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
};

const GROUPS = [
  { title: 'Websites', items: [
    { id: 'mochimo_monitor', name: 'Mochimo website', host: 'mochimo.org' },
    { id: 'mochiscan_monitor', name: 'Mochiscan explorer', host: 'mochiscan.org' } ] },
  { title: 'APIs', items: [
    { id: 'api_mochimo_monitor', name: 'Production API', host: 'api.mochimo.org' },
    { id: 'api_deu_mochimo_monitor', name: 'API, Germany', host: 'api-deu.mochimo.org' },
    { id: 'api_sgp_mochimo_monitor', name: 'API, Singapore', host: 'api-sgp.mochimo.org' },
    { id: 'api_usc_mochimo_monitor', name: 'API, US Central', host: 'api-usc.mochimo.org' },
    { id: 'api_dev_mochiscan_monitor', name: 'Mochiscan API, development', host: 'dev-api.mochiscan.org:8443' } ] }
];

function relativeTime (ts, now) {
  const minutes = Math.floor((now - ts) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(ts).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
}

export default function Status () {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(() => Date.now());
  const abortRef = useRef(null);
  const hasDataRef = useRef(false);

  const load = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    if (!hasDataRef.current) setLoading(true);
    try {
      const res = await fetch('https://status.mochimo.org/api/data', { signal: controller.signal });
      if (!res.ok) throw new Error('status ' + res.status);
      const json = await res.json();
      hasDataRef.current = true;
      setData(json);
      setError(null);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError('unreachable');
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      if (!document.hidden) load();
    }, 60000);
    const onVisible = () => {
      if (!document.hidden) load();
    };
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [load]);

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(tick);
  }, []);

  const monitors = (data && data.monitors) || {};
  const shown = GROUPS.flatMap((group) => group.items).filter((item) => monitors[item.id]);
  const upCount = shown.filter((item) => monitors[item.id].up).length;
  const total = shown.length;
  const allUp = !!data && total > 0 && upCount === total;
  const firstMonitor = Object.values(monitors)[0];
  const location = firstMonitor ? firstMonitor.location : null;

  let headline = 'Checking services';
  if (data) {
    headline = allUp ? 'All systems operational' : `${upCount} of ${total} services operational`;
  } else if (error) {
    headline = 'Status unavailable';
  }

  const dotSx = !data
    ? { bgcolor: tokens.textFaint }
    : allUp
      ? { bgcolor: tokens.brand }
      : { bgcolor: 'transparent', border: `2px solid ${tokens.textDim}` };

  const SUMMARY = (
    <Box
      role='status'
      aria-live='polite'
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        gap: 2.5,
        p: { xs: 3, md: 4 },
        bgcolor: tokens.raise,
        border: `1px solid ${tokens.line}`,
        borderRadius: '20px',
        mb: { xs: 5, md: 6 }
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', flexShrink: 0, ...dotSx }} />
          <Typography
            sx={{
              fontFamily: display,
              fontWeight: 600,
              fontSize: { xs: '1.2rem', md: '1.35rem' },
              color: tokens.text
            }}
          >{headline}
          </Typography>
        </Box>
        {data && (
          <Typography
            sx={{
              mt: 0.75,
              fontFamily: mono,
              fontSize: '0.6875rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: tokens.textFaint
            }}
          >{`Updated ${relativeTime(data.updatedAt * 1000, now)}${error ? '. Refresh failed' : ''}`}
          </Typography>
        )}
      </Box>
      <Button
        variant='outlined'
        size='small'
        startIcon={<RefreshIcon />}
        onClick={load}
        disabled={loading}
      >
        Refresh
      </Button>
    </Box>
  );

  const SKELETON = (
    <>
      {[0, 1, 2].map((groupIndex) => (
        <Box key={groupIndex} aria-hidden sx={{ mb: { xs: 4, md: 5 } }}>
          <Box sx={{ width: 140, height: 22, borderRadius: '10px', mb: 1.5, ...SKELETON_SX }} />
          <Box
            sx={{
              bgcolor: tokens.raise,
              border: `1px solid ${tokens.line}`,
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >
            {[0, 1, 2].map((rowIndex) => (
              <Box
                key={rowIndex}
                sx={{
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: { xs: 2.5, md: 3 },
                  borderTop: rowIndex > 0 ? `1px solid ${tokens.line}` : 'none'
                }}
              >
                <Box sx={{ width: '40%', height: 14, borderRadius: '10px', ...SKELETON_SX }} />
                <Box sx={{ width: 84, height: 22, borderRadius: 999, ...SKELETON_SX }} />
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </>
  );

  const ERROR = (
    <Box
      sx={{
        p: { xs: 3, md: 4 },
        mb: { xs: 4, md: 5 },
        border: `1px solid ${tokens.line}`,
        borderRadius: '20px',
        bgcolor: tokens.raise
      }}
    >
      <Typography sx={{ fontFamily: display, fontWeight: 600, fontSize: '1.2rem', color: tokens.text }}>
        The status service could not be reached
      </Typography>
      <Typography sx={{ mt: 1, color: tokens.textDim }}>
        Check your connection, or open the status page directly.
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2.5 }}>
        <Button variant='contained' onClick={load}>
          Try again
        </Button>
        <Button
          variant='outlined'
          href='https://status.mochimo.org'
          target='_blank'
          rel='noopener noreferrer'
          endIcon={<NorthEastIcon />}
        >
          Open status page
        </Button>
      </Box>
    </Box>
  );

  const GROUP_LIST = GROUPS.map((group) => {
    const sectionId = `status-${group.title.toLowerCase()}`;
    return (
      <Box key={group.title} component='section' aria-labelledby={sectionId} sx={{ mb: { xs: 4, md: 5 } }}>
        <Typography
          id={sectionId}
          component='h2'
          sx={{
            fontFamily: display,
            fontWeight: 600,
            fontSize: '1.35rem',
            color: tokens.text,
            mb: 1.5
          }}
        >{group.title}
        </Typography>
        <Box
          sx={{
            bgcolor: tokens.raise,
            border: `1px solid ${tokens.line}`,
            borderRadius: '20px',
            overflow: 'hidden'
          }}
        >
          {group.items.map((item, index) => {
            const monitor = monitors[item.id];
            const detailLabel = !monitor
              ? 'No data'
              : monitor.up ? `${monitor.latency} ms` : monitor.message;
            const detailColor = !monitor
              ? tokens.textFaint
              : monitor.up ? tokens.textDim : tokens.text;
            const pillSx = !monitor
              ? { label: 'Unknown', color: tokens.textFaint, bgcolor: 'transparent', border: `1px solid ${tokens.line}` }
              : monitor.up
                ? { label: 'Operational', color: tokens.base, bgcolor: tokens.brand, border: 'none' }
                : { label: 'Down', color: tokens.text, bgcolor: 'transparent', border: `1px solid ${tokens.lineStrong}` };
            const { label, ...pillStyle } = pillSx;

            return (
              <Box
                key={item.id}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: 'minmax(0,1fr) auto', md: 'minmax(0,1fr) 220px 140px' },
                  alignItems: 'center',
                  columnGap: 2,
                  rowGap: 0.5,
                  px: { xs: 2.5, md: 3 },
                  py: 2,
                  borderTop: index > 0 ? `1px solid ${tokens.line}` : 'none'
                }}
              >
                <Box sx={{ gridColumn: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontFamily: display,
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      color: tokens.text,
                      lineHeight: 1.3
                    }}
                  >{item.name}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: mono,
                      fontSize: '0.6875rem',
                      color: tokens.textFaint
                    }}
                  >{item.host}
                  </Typography>
                  <Typography
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      fontFamily: mono,
                      fontSize: '0.8125rem',
                      color: detailColor
                    }}
                  >{detailLabel}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    textAlign: 'right',
                    fontFamily: mono,
                    fontSize: '0.8125rem',
                    color: detailColor
                  }}
                >{detailLabel}
                </Typography>
                <Box
                  component='span'
                  sx={{
                    justifySelf: 'end',
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 999,
                    fontFamily: mono,
                    fontSize: '0.625rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    ...pillStyle
                  }}
                >{label}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  });

  return (
    <Container maxWidth='lg' sx={{ pb: { xs: 4, md: 8 } }}>
      <PageHero
        title='Live System Status'
        lede="Current health of Mochimo's websites and APIs, from the official status monitor."
      />
      {SUMMARY}
      {!data && !error && SKELETON}
      {!data && error && ERROR}
      {data && GROUP_LIST}
      <Typography sx={{ mt: 1, fontSize: '0.875rem', color: tokens.textFaint }}>
        Data from{' '}
        <Link href='https://status.mochimo.org' target='_blank' rel='noopener noreferrer'>
          status.mochimo.org
        </Link>
        {location ? `, measured from ${location}` : ''}. Refreshed every minute.
      </Typography>
    </Container>
  );
}
