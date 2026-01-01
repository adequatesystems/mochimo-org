import { forwardRef, lazy, Suspense, useMemo } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, responsiveFontSizes } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ScrollToTop from 'app/component/ScrollToTop';
import Header from './app/component/Header';

import {
  Adq, Exchanges, MeetTheTeam, MobileWalletPrivacy, Privacy
} from 'app/other';
import Network from 'app/network';
import MFXGlobe from 'app/mfx-globe';
import Status from 'app/status';
import Homepage from 'app/homepage';
import Explorer from 'app/explorer';
import ExplorerBlock from 'app/explorer-block';
import ExplorerLedger from 'app/explorer-ledger';
import Footer from 'app/component/Footer';
import Mining from './app/pages/Mining';
import FAQ from './app/pages/FAQ';

const BackgroundWave = lazy(() => import('app/component/BackgroundWave'));

// custom link handling (forward MUI links to react-router links)
const LinkForwarder = forwardRef(({ children, ...props }, ref) => {
  // Map 'href' to external link; (MUI) -> to (<a>)
  // Map 'to' to internal link; (MUI) -> to (react-router)
  return props.href
    ? (<a ref={ref} {...props}>{children}</a>)
    : (<Link ref={ref} {...props}>{children}</Link>);
});

export default function App () {
  const mode = 'dark'; // Theme is hardcoded to dark mode
  const customTheme = useMemo(() => {
    return responsiveFontSizes(
      createTheme({
        components: {
          MuiButton: {
            defaultProps: {
              color: 'primary'
            }
          },
          MuiContainer: {
            defaultProps: {
              sx: { position: 'relative' }
            }
          },
          MuiLink: {
            defaultProps: {
              component: LinkForwarder,
              color: 'primary'
            }
          }
        },
        palette: {
          mode,
          primary: { main: /* mode === 'dark' ? '#00d9ff' : */ '#0059ff' },
          secondary: { main: '#0059ff' /* '#ffa600' */ },
          textPrimary: { main: 'white' }
        },
        typography: {
          h1: {
            fontFamily: 'Iceland',
            textAlign: 'center',
            transition: 'font-size 250ms ease'
          },
          h2: {
            fontFamily: 'Nunito Sans',
            fontWeight: 'bold'
          },
          h3: {
            fontFamily: 'Nunito Sans',
            fontWeight: 'bold'
          },
          h4: {
            fontFamily: 'Nunito Sans',
            fontWeight: 'bold'
          },
          h5: {
            fontFamily: 'Nunito Sans',
            fontWeight: 'bold'
          },
          h6: {
            fontFamily: 'Roboto Mono'
          },
          caption: {
            fontFamily: 'Roboto Mono'
          },
          haiku: {
            fontFamily: 'Redressed',
            fontSize: '2em',
            fontWeight: 'bold',
            letterSpacing: 1.5,
            whiteSpace: 'pre'
          }
        }
      })
    );
  }, [mode]);
  const mfxTheme = createTheme({
    ...customTheme, palette: {
      mode: 'dark', background: { default: 'transparent' }
    }
  });

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        {/* Header (always shown) */}
        {/* Header removed on /network/globe */}
        <Routes>
          <Route path='mfx'>
            <Route
              path='globe' element={(
                <ThemeProvider theme={mfxTheme}>
                  <CssBaseline />
                  <MFXGlobe />
                </ThemeProvider>
              )}
            />
          </Route>
          <Route
            path='*' element={(
              <>
                <CssBaseline />
                <Header actualTheme={mode} />
              </>
            )}
          />
        </Routes>
        {/* Page layout container (minimum 100% "visual height") */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >{/* Page body (auto fills remaining layout height) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              paddingBottom: 10,
              paddingTop: 10,
              flexGrow: 1
            }}
          >
            <Routes>
              {/* Background effects Routes */}
              <Route index element={null} />
              <Route path='mfx'>
                <Route path='*' element={null} />
              </Route>
              <Route path='network' element={null} />
              <Route
                path='*' element={(
                  <Suspense fallback={null}>
                    <BackgroundWave />
                  </Suspense>
                )}
              />
            </Routes>
            <Routes>
              {/* Page content Routes */}
              <Route index element={<Homepage />} />
              <Route path='adq' element={<Adq />} />
              <Route path='mfx'>
                <Route path='*' element={null} />
              </Route>
              <Route path='meet-the-team' element={<MeetTheTeam />} />
              <Route path='exchanges-mcm' element={<Exchanges />} />
              <Route path='privacy-policy' element={<Privacy />} />
              <Route path='mobile-wallet-privacy' element={<MobileWalletPrivacy />} />
              <Route path='status' element={<Status />} />
              <Route path='network' element={<Network />} />
              <Route path='explorer'>
                <Route index element={<Explorer />} />
                <Route path='address'>
                  <Route index element={<Explorer type='address' />} />
                  <Route path=':value' element={<ExplorerLedger type='address' />} />
                </Route>
                <Route path='block'>
                  <Route index element={<Explorer type='block' />} />
                  <Route path=':bnum/:bhash' element={<ExplorerBlock />} />
                  <Route path=':bnum' element={<ExplorerBlock />} />
                </Route>
                <Route path='richlist' element={<Explorer type='richlist' />} />
                <Route path='tag'>
                  <Route index element={<Navigate replace to='/explorer/address' />} />
                  <Route path=':value' element={<ExplorerLedger type='tag' />} />
                </Route>
                <Route path='transaction' element={<Explorer type='transaction' />} />
                <Route path='*' element={<Navigate replace to='/explorer' />} />
              </Route>
              <Route path='mining' element={<Mining />} />
              <Route path='faq' element={<FAQ />} />
            </Routes>
          </Box>
          <Routes>
            {/* Page footer (not shown on interactive network page) */}
            <Route path='network' element={null} />
            <Route path='mfx'>
              <Route path='*' element={null} />
            </Route>
            <Route path='*' element={<Footer />} />
          </Routes>
          
        </Box>
      </BrowserRouter>
      {/* ScrollToTop component sits above all other components */}
      <ScrollToTop />
    </ThemeProvider>
  );
}
