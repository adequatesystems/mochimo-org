import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { applyObjDiff, dupObj } from '../../util';
import { useGetNetworkQuery } from 'api';
import { tokens, mono } from 'theme';

import { Box, LinearProgress } from '@mui/material';
import Globe from 'react-globe.gl';

const ARC_REL_LEN = 0.4; // relative to whole arc
const FLIGHT_TIME = 1000;
export default function NetworkGlobe ({ mfx }) {
  const mql = window.matchMedia('(max-width: 600px)');
  const globe = useRef();
  const [options, setOptions] = useState({ autoRotate: true });
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(1);
  const [countries, setCountries] = useState({ features: [] });
  const [arcsData, setArcsData] = useState([]);
  const [nodes] = useState(new Map());
  const { data } = useGetNetworkQuery();

  const stopRotate = useCallback((p) => setOptions((opts) => (
    { ...opts, autoRotate: Boolean(!p) })), [setOptions]);

  const resolution = useCallback(() => mql.matches ? 2 : 3, [mql.matches]);
  const hexBinColor = useCallback(({ sumWeight }) => {
    // location is considered "congested" when location weight reaches 12.5%
    const ratio = (sumWeight / Math.max(points.length, 1)) / 0.125;
    const t = Number.isFinite(ratio) ? Math.min(1, Math.max(0, ratio)) : 0;
    // ramp: deep mint at 0, brand mint at 0.5, ink at 1
    const [from, to, k] = t < 0.5
      ? [[16, 176, 120], [21, 220, 150], t * 2]
      : [[21, 220, 150], [245, 247, 247], (t - 0.5) * 2];
    const [r, g, b] = from.map((c, i) => Math.round(c + (to[i] - c) * k));
    return `rgb(${r}, ${g}, ${b})`;
  }, [points.length]);

  const updatePoints = useCallback((update) => {
    if (!update) return;
    let rebuildPoints = false;
    // condition input data
    update = Array.isArray(update) ? update : [update];
    for (const node of update) {
      // check for location update
      const prev = nodes.get(node.ip) || {};
      rebuildPoints = Boolean('loc' in node && node.loc !== prev.loc);
      // apply node update
      if (nodes.has(node.ip)) applyObjDiff(nodes.get(node.ip), dupObj(node));
      else nodes.set(node.ip, { ...dupObj(node) });
    }
    // check and rebuild points
    if (rebuildPoints) {
      setPoints(() => {
        const next = [];
        nodes.forEach((node) => {
          if ('loc' in node && !next.find(({ ip }) => ip === node.ip)) {
            const { ip, loc } = node;
            const [lat, lng] = loc.split(',').map((n) => +n);
            next.push({ ip, lat, lng });
          }
        });
        return next;
      });
    }
  }, [nodes]);

  useEffect(() => {
    if (!countries.features.length) {
      /* eslint-disable-next-line no-undef */// fetch is defined globally
      fetch('/assets/data/countries-hex-data.json')
        .then((res) => res.json())
        .then(setCountries)
        .finally(() => setLoading(0));
    }
  }, [countries.features.length]);

  // ////////////////////
  // Update Network State
  useEffect(() => updatePoints(data), [data, updatePoints]);
  useEffect(() => {
    // expose EventSource API and create new stream
    const { EventSource } = window;
    const source = new EventSource('https://ip.leonapp.it:8082/stream?network');
    const pending = [];
    // set stream event handlers
    // source.onopen = () => console.log('Network stream opened...');
    source.onerror = (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Network stream error:', error);
      }
    };
    source.onmessage = (message) => {
      // ignore non-object messages
      if (typeof message !== 'object') return;
      if (typeof message.data !== 'string') return;
      try { // convert data, check ip, delete eventType and update
        const update = JSON.parse(message.data);
        const { ip, peers } = update;
        if (typeof ip !== 'string') return;
        delete update.eventType;
        updatePoints(update);
        // build communications data on available peer updates
        const fromloc = nodes.get(ip)?.loc;
        if (peers && fromloc) {
          const now = Date.now();
          const expires = now + (FLIGHT_TIME * 2);
          const [endLat, endLng] = fromloc.split(',').map((n) => +n);
          peers.forEach((peer) => {
            if (peer && nodes.has(peer) && 'loc' in nodes.get(peer)) {
              // determine start loc
              const { loc } = nodes.get(peer);
              const [startLat, startLng] = loc.split(',').map((n) => +n);
              pending.push({ startLat, startLng, endLat, endLng, expires });
            }
          });
        }
      } catch (error) {
        // catch process breaking error
        if (process.env.NODE_ENV === 'development') {
          console.error('Message parsing error:', error);
        }
      }
    };
    const interval = setInterval(() => {
      const now = Date.now();
      const next = [];
      for (let i = 0; i < Math.ceil(pending.length / 10); i++) {
        const arc = pending.shift();
        arc.expires = (now + (FLIGHT_TIME * 2));
        next.push(arc);
      }
      setArcsData((arcs) => [...arcs.filter((a) => a.expires > now), ...next]);
    }, 100);
    // return unmount/cleanup function
    return () => {
      source.close();
      clearInterval(interval);
    };
  }, [nodes, updatePoints]);

  // autorotate, resize listener
  useEffect(() => {
    if (globe.current) {
      function resize () {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
        const { current } = globe;
        if (current) {
          current.camera().aspect = window.innerWidth / window.innerHeight;
          current.camera().updateProjectionMatrix();
          current.renderer().setSize(window.innerWidth, window.innerHeight);
          current.controls().autoRotate = true;
          current.controls().autoRotateSpeed = mql.matches ? 1 : 0.25;
          current.controls().enableZoom = false;  
          if (mfx) {
            //current.controls().enableZoom = false;
            current.controls().minDistance = 300;
            current.controls().maxDistance = 300;
          }
        }
      }
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, [mql.matches, mfx]);

  useEffect(() => {
    if (globe.current) {
      globe.current.controls().autoRotate = options.autoRotate;
    }
  }, [options.autoRotate]);

  const getTooltip = useCallback((d) => {
    const { countryCode, region } = nodes.get(d.points[0].ip);
    const density = d.sumWeight / (points.length * 0.125);
    const levels = ['light', 'medium', 'high', 'congested'];
    const levelsMax = levels.length - 1;
    const level = levels[Math.min(levelsMax, Math.floor((density * levelsMax)))];
    return `
      <div style="font-family: 'IBM Plex Mono', ui-monospace, monospace; font-size: 13px; line-height: 1.6; color: #F5F7F7; background: #1D2A2E; border: 1px solid #2B3B40; border-radius: 14px; padding: 12px 14px; max-width: min(320px, 80vw);">
        <div style="font-family: Montserrat, system-ui, sans-serif; font-weight: 600; font-size: 13px; margin-bottom: 4px;">${countryCode}, ${region}</div>
        <div style="color: #8A989C;">Node density: ${level}</div>
        <ul style="margin:0;padding:0 1em 0 1.5em;">${
          d.points
            .map(({ ip }) => nodes.get(ip))
            .map(({ ip, uptimestamp }) => {
            let str = '';
            let uptime = uptimestamp ? Date.now() - uptimestamp : 0;
            const seconds = ((uptime /= 1000) | 0) % 60;
            if (seconds) str = seconds + ' second' + (seconds > 1 ? 's' : '');
            const minutes = ((uptime /= 60) | 0) % 60;
            if (minutes) str = minutes + ' minute' + (minutes > 1 ? 's' : '');
            const hours = ((uptime /= 60) | 0) % 24;
            if (hours) str = hours + ' hour' + (hours > 1 ? 's' : '');
            const days = (uptime /= 24) | 0;
            if (days) str = days + ' day' + (days > 1 ? 's' : '');
            return `<li style="white-space: normal; word-break: break-all;">${ip}${str ? `, ${str} uptime` : ''}</li>`;
          }).join('')
        }</ul>
      </div>
    `;
  }, [nodes, points.length]);

  return (
    <>
      <Globe
        ref={globe}
        width={width}
        height={height}
        backgroundImageUrl={mfx ? '' : '/assets/globe/8k_stars.webp'}
        backgroundColor={mfx ? 'rgba(0, 0, 0, 0)' : '#172124'}
        hexBinPointsData={points}
        hexBinResolution={3}
        hexAltitude={useCallback((d) => d.sumWeight / points.length, [points])}
        hexSideColor={hexBinColor}
        hexTopColor={hexBinColor}
        hexLabel={getTooltip}
        onHexHover={stopRotate}
        hexPolygonsData={useMemo(() => countries.features, [countries])}
        hexPolygonAltitude={0.005}
        hexPolygonColor={useCallback(() => '#3A4C52', [])}
        hexPolygonCurvatureResolution={useCallback(() => 5, [])}
        hexPolygonResolution={resolution}
        arcsData={arcsData}
        arcColor={useCallback(() => 'rgba(245,247,247,0.85)', [])}
        arcDashLength={useCallback(() => ARC_REL_LEN, [])}
        arcDashGap={useCallback(() => 2, [])}
        arcDashInitialGap={useCallback(() => 1, [])}
        arcDashAnimateTime={useCallback(() => FLIGHT_TIME, [])}
        arcsTransitionDuration={useMemo(() => 0, [])}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: loading,
          transform: 'translate(-50%,-50%)'
        }}
      >
        <Box component='span' sx={{
          fontFamily: mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: tokens.textFaint
        }}>Loading network map</Box><br /><LinearProgress />
      </Box>
    </>
  );
}
