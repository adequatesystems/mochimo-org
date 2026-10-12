import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const tokens = {
  base: '#172124',
  raise: '#1D2A2E',
  surface: '#22333A',
  brand: '#15DC96',
  brandDeep: '#10B078',
  brandDim: '#0B4A35',
  accent: '#15DC96',
  text: '#F5F7F7',
  textDim: '#B4BFC2',
  textFaint: '#8A989C',
  line: '#2B3B40',
  lineStrong: '#3A4C52',
  glow: 'rgba(21, 220, 150, 0.22)'
};

export const display = '"Montserrat", system-ui, -apple-system, sans-serif';
export const body = '"Poppins", system-ui, -apple-system, sans-serif';
export const mono = '"IBM Plex Mono", ui-monospace, monospace';

export const fx = {
  glass: {
    background: tokens.raise,
    border: `1px solid ${tokens.line}`,
    backdropFilter: 'none'
  },
  hairline: `1px solid ${tokens.line}`,
  brandGradient: `linear-gradient(135deg, ${tokens.brandDeep} 0%, ${tokens.brand} 50%, ${tokens.accent} 100%)`,
  textGradient: {
    background: `linear-gradient(135deg, ${tokens.text} 20%, ${tokens.accent} 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  lift: {
    transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: 'rgba(21,220,150,0.5)'
    },
    '@media (prefers-reduced-motion: reduce)': {
      transition: 'border-color 220ms ease',
      '&:hover': { transform: 'none' }
    }
  }
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: tokens.brand, dark: tokens.brandDeep, light: '#5FE8B5' },
    secondary: { main: tokens.accent },
    background: { default: tokens.base, paper: tokens.raise },
    text: { primary: tokens.text, secondary: tokens.textDim },
    textPrimary: { main: tokens.text },
    divider: tokens.line
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: body,
    h1: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.035em',
      lineHeight: 1.02,
      textAlign: 'center'
    },
    h2: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      lineHeight: 1.08
    },
    h3: {
      fontFamily: display,
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.14
    },
    h4: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.2
    },
    h5: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.28
    },
    h6: {
      fontFamily: display,
      fontWeight: 600,
      letterSpacing: '-0.01em',
      lineHeight: 1.35
    },
    body1: { fontSize: '1rem', lineHeight: 1.68, letterSpacing: '0.002em' },
    body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
    caption: {
      fontFamily: body,
      fontSize: '0.8125rem',
      lineHeight: 1.6,
      letterSpacing: '0.005em'
    },
    overline: {
      fontFamily: mono,
      fontSize: '0.6875rem',
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      lineHeight: 1.6
    },
    mono: { fontFamily: mono },
    haiku: {
      fontFamily: 'Redressed, cursive',
      fontSize: '2em',
      fontWeight: 'bold',
      letterSpacing: 1.5,
      whiteSpace: 'pre'
    },
    button: { fontFamily: display, fontWeight: 600, letterSpacing: '0.01em' }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          scrollbarColor: `${tokens.lineStrong} ${tokens.base}`,
          scrollbarWidth: 'thin'
        },
        body: {
          backgroundColor: tokens.base,
          backgroundImage: [
            `radial-gradient(1100px 620px at 12% -8%, rgba(21,220,150,0.07), transparent 62%)`,
            `radial-gradient(900px 520px at 88% 4%, rgba(21,220,150,0.04), transparent 60%)`,
            `radial-gradient(1200px 800px at 50% 108%, rgba(16,176,120,0.04), transparent 66%)`
          ].join(','),
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat'
        },
        '::selection': { background: 'rgba(21,220,150,0.28)' },
        '*::-webkit-scrollbar': { width: 10, height: 10 },
        '*::-webkit-scrollbar-track': { background: tokens.base },
        '*::-webkit-scrollbar-thumb': {
          background: tokens.lineStrong,
          borderRadius: 8,
          border: `2px solid ${tokens.base}`
        },
        '*::-webkit-scrollbar-thumb:hover': { background: tokens.textFaint },
        a: { textUnderlineOffset: '0.2em', textDecorationThickness: '1px' },
        ':focus-visible': { outline: `2px solid ${tokens.brand}`, outlineOffset: '3px' },
        ':focus:not(:focus-visible)': { outline: 'none' },
        'input, textarea': { caretColor: tokens.brand },
        '@media (prefers-reduced-motion: reduce)': {
          html: { scrollBehavior: 'auto' },
          '*, *::before, *::after': {
            transitionProperty: 'color, background-color, border-color, outline-color, opacity !important',
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important'
          },
          'a:hover, button:hover, [role="button"]:hover': { transform: 'none !important' }
        }
      }
    },
    MuiContainer: {
      defaultProps: { sx: { position: 'relative' } }
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 20 }
      }
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 20,
          backgroundColor: fx.glass.background,
          backgroundImage: 'none',
          border: fx.hairline,
          backdropFilter: 'none'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: { padding: 24, '&:last-child': { paddingBottom: 24 } }
      }
    },
    MuiButton: {
      defaultProps: { color: 'primary', disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontSize: '0.9375rem',
          padding: '10px 22px',
          transition: 'transform 200ms cubic-bezier(0.22,1,0.36,1), box-shadow 200ms ease, background 200ms ease, color 200ms ease, border-color 200ms ease',
          '&:active': { transform: 'translateY(1px)' }
        },
        sizeLarge: { padding: '14px 30px', fontSize: '1rem' },
        contained: {
          background: tokens.brand,
          color: tokens.base,
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            background: tokens.text,
            color: tokens.base,
            boxShadow: 'none',
            transform: 'none'
          }
        },
        outlined: {
          borderColor: tokens.lineStrong,
          color: tokens.text,
          '&:hover': {
            borderColor: tokens.brand,
            color: tokens.brand,
            background: 'rgba(21,220,150,0.08)',
            transform: 'none'
          }
        }
      }
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: false },
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: fx.hairline,
          backgroundColor: fx.glass.background,
          backgroundImage: 'none',
          backdropFilter: 'none',
          marginBottom: 10,
          overflow: 'hidden',
          transition: 'border-color 220ms ease, background 220ms ease',
          '&:before': { display: 'none' },
          '&:hover': { borderColor: tokens.lineStrong },
          '&.Mui-expanded': {
            borderColor: tokens.brand,
            backgroundImage: 'linear-gradient(rgba(21,220,150,0.04), rgba(21,220,150,0.04))'
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: { padding: '4px 20px', minHeight: 68 },
        content: { margin: 0 },
        expandIconWrapper: { color: tokens.textDim }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '4px 24px 24px',
          color: tokens.textDim,
          lineHeight: 1.7,
          borderTop: fx.hairline,
          paddingTop: 20
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          boxShadow: 'none',
          backgroundColor: 'transparent'
        }
      }
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: tokens.brand,
          textDecorationColor: 'rgba(21,220,150,0.4)',
          transition: 'color 160ms ease',
          '&:hover': { color: tokens.accent }
        }
      }
    },
    MuiDivider: {
      styleOverrides: { root: { borderColor: tokens.line } }
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 8, fontFamily: mono, fontSize: '0.8125rem' },
        outlined: { borderColor: tokens.lineStrong }
      }
    },
    MuiTooltip: {
      defaultProps: { arrow: true },
      styleOverrides: {
        tooltip: {
          background: tokens.surface,
          border: fx.hairline,
          fontFamily: body,
          fontSize: '0.8125rem',
          padding: '8px 12px',
          borderRadius: 8
        },
        arrow: { color: tokens.surface }
      }
    },
    MuiAvatar: {
      styleOverrides: { root: { border: fx.hairline } }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'color 180ms ease, background 180ms ease, transform 180ms ease',
          '&:hover': { color: tokens.accent, transform: 'translateY(-2px)' }
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: tokens.line },
        head: {
          fontFamily: mono,
          fontSize: '0.6875rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: tokens.textFaint
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);
