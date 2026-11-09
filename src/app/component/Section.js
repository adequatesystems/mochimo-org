import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { tokens, fx, mono, display } from 'theme';

const REVEAL_EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export function Reveal ({ children, delay = 0, sx }) {
  const ref = useRef(null);
  const [state, setState] = useState('static'); // 'static' | 'hidden' | 'shown'

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof window === 'undefined') return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) return undefined; // already on screen: never hide
    setState('hidden');
    let width = window.innerWidth;
    let settling = 0;
    const reveal = () => {
      setState('shown');
      observer.disconnect();
      tallObserver.disconnect();
      window.removeEventListener('resize', onResize);
      node.removeEventListener('focusin', onFocus);
      cancelAnimationFrame(settling);
    };
    const show = ([entry]) => {
      if (entry.isIntersecting) reveal();
    };
    // Rotating a phone can put a hidden block on screen with no scroll, so check again when the width changes
    // Height alone is skipped because the iOS toolbar changes it during a scroll
    const onResize = () => {
      if (window.innerWidth === width) return;
      width = window.innerWidth;
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight * 0.92 && box.bottom > 0) reveal();
    };
    // Tab can land on a link in a hidden block, and the focus scroll is smooth, so wait for it to stop
    // An observer usually fires during that scroll, so the block still fades in on screen
    const onFocus = () => {
      if (settling) return;
      const start = performance.now();
      let y = window.scrollY;
      let still = 0;
      const check = () => {
        if (window.scrollY === y) {
          still += 1;
        } else {
          still = 0;
          y = window.scrollY;
        }
        if (still >= 4 || performance.now() - start > 1500) {
          // Focus with no scroll, or a fast burst of Tabs, can leave the block off screen, so leave it to the observers then
          settling = 0;
          const box = node.getBoundingClientRect();
          if (box.top < window.innerHeight && box.bottom > 0) reveal();
        } else settling = requestAnimationFrame(check);
      };
      settling = requestAnimationFrame(check);
    };
    const observer = new IntersectionObserver(show, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    // 15% of a very tall block can be more than fits on a short screen, so the threshold above never passes
    // This shows it once its top reaches mid screen, and also shows blocks over 2.8 screens tall a little sooner
    const tallObserver = new IntersectionObserver(show, { rootMargin: '0px 0px -50% 0px' });
    observer.observe(node);
    tallObserver.observe(node);
    window.addEventListener('resize', onResize);
    node.addEventListener('focusin', onFocus);
    return () => {
      observer.disconnect();
      tallObserver.disconnect();
      window.removeEventListener('resize', onResize);
      node.removeEventListener('focusin', onFocus);
      cancelAnimationFrame(settling);
    };
  }, []);

  const hidden = state === 'hidden';
  return (
    <Box
      ref={ref}
      sx={{
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'translate3d(0, 18px, 0)' : 'none',
        filter: hidden ? 'blur(6px)' : 'none',
        transition: state === 'shown'
          ? `opacity 800ms ${REVEAL_EASE} ${delay}ms, transform 800ms ${REVEAL_EASE} ${delay}ms, filter 800ms ${REVEAL_EASE} ${delay}ms`
          : 'none',
        willChange: hidden ? 'opacity, transform, filter' : 'auto',
        // The observers do not run for print, so a block not yet scrolled to would print blank
        // No transition helps a block caught mid fade print in full in some browsers, but not in Safari's print
        '@media print': { opacity: 1, transform: 'none', filter: 'none', transition: 'none' },
        ...sx
      }}
    >{children}
    </Box>
  );
}

export function Eyebrow ({ children, sx }) {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        mb: 2,
        ...sx
      }}
    >
      <Box sx={{ width: 22, height: '1px', background: tokens.brand }} />
      <Typography
        component='span'
        sx={{
          fontFamily: mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: tokens.brand
        }}
      >{children}
      </Typography>
    </Box>
  );
}

export function SectionHeading ({ eyebrow, title, subtitle, align = 'left', maxWidth = 640 }) {
  const centered = align === 'center';
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 6 },
        ...(centered && { mx: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' })
      }}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Typography
        variant='h3'
        sx={{ fontSize: { xs: '1.9rem', sm: '2.3rem', md: '2.7rem' }, color: tokens.text }}
      >{title}
      </Typography>
      {subtitle && (
        <Typography
          sx={{
            mt: 2,
            maxWidth,
            color: tokens.textDim,
            fontSize: { xs: '0.98rem', md: '1.05rem' },
            lineHeight: 1.7
          }}
        >{subtitle}
        </Typography>
      )}
    </Box>
  );
}

export function Section ({ children, id, sx, containerProps }) {
  return (
    <Box
      component='section' id={id}
      sx={{ position: 'relative', py: { xs: 7, md: 12 }, ...sx }}
    >
      <Container maxWidth='lg' {...containerProps}>{children}</Container>
    </Box>
  );
}

export function GlassPanel ({ children, hover = false, sx, ...props }) {
  return (
    <Box
      sx={{
        position: 'relative',
        borderRadius: '20px',
        border: fx.hairline,
        backgroundColor: fx.glass.background,
        backdropFilter: 'none',
        overflow: 'hidden',
        ...(hover && fx.lift),
        ...sx
      }}
      {...props}
    >{children}
    </Box>
  );
}

export function PageHero ({ title, lede, children }) {
  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 1, md: 2 },
        pb: { xs: 5, md: 7 },
        mb: { xs: 5, md: 7 },
        borderBottom: '1px solid #24343A'
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage: 'url(/assets/images/brand-mark-tile.svg)',
          backgroundSize: { xs: '56px 56px', md: '72px 72px' },
          backgroundPosition: 'right top',
          opacity: 0.08,
          maskImage: 'radial-gradient(ellipse 45% 90% at 100% 30%, #000 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 45% 90% at 100% 30%, #000 0%, transparent 75%)'
        }}
      />
      <Box sx={{ position: 'relative' }}>
        <Typography
          variant='h1'
          sx={{
            textAlign: 'left',
            fontFamily: display,
            fontWeight: 600,
            fontSize: { xs: '2.4rem', sm: '2.9rem', md: '3.4rem' },
            lineHeight: 1.06,
            letterSpacing: '-0.03em',
            color: tokens.text,
            maxWidth: '22ch',
            hyphens: 'manual',
            textWrap: 'balance'
          }}
        >{title}
        </Typography>
        {lede && (
          <Typography
            sx={{
              mt: 2.5,
              maxWidth: '62ch',
              color: tokens.textDim,
              fontWeight: 300,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.65,
              textAlign: 'left'
            }}
          >{lede}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}
