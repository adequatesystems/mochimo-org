import { forwardRef, lazy, Suspense, useEffect, useMemo } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import ScrollToTop from 'app/component/ScrollToTop';
import Header from './app/component/Header';
import baseTheme from 'theme';

import {
  Adq, Exchanges, MeetTheTeam, MobileWalletPrivacy, MobileWalletTerms, Privacy
} from 'app/other';
import Status from 'app/status';
import Homepage from 'app/homepage';
import Footer from 'app/component/Footer';
import Mining from './app/pages/Mining';
import FAQ from './app/pages/FAQ';
import Vote from './app/pages/Vote';

const BackgroundWave = lazy(() => import('app/component/BackgroundWave'));

const FULL_BLEED = ['/'];

const LinkForwarder = forwardRef(({ children, ...props }, ref) => {
  return props.href
    ? (<a ref={ref} {...props}>{children}</a>)
    : (<Link ref={ref} {...props}>{children}</Link>);
});

function MochiscanRedirect () {
  useEffect(() => { window.location.replace('https://mochiscan.org'); }, []);
  return null;
}

function PageBody ({ children }) {
  const { pathname } = useLocation();
  const bleed = FULL_BLEED.includes(pathname) || pathname.startsWith('/mfx');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexGrow: 1,
        paddingTop: bleed ? 0 : { xs: '104px', md: '134px' },
        paddingBottom: bleed ? 0 : { xs: 6, md: 10 }
      }}
    >{children}
    </Box>
  );
}

export default function App () {
  const customTheme = useMemo(() => createTheme(baseTheme, {
    components: {
      MuiLink: { defaultProps: { component: LinkForwarder } }
    }
  }), []);

  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path='mfx'>
            <Route path='globe' element={<Navigate replace to='/' />} />
          </Route>
          <Route
            path='*' element={(
              <>
                <CssBaseline />
                <Header />
              </>
            )}
          />
        </Routes>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <PageBody>
            <Routes>
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
            <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='adq' element={<Adq />} />
              <Route path='mfx'>
                <Route path='*' element={null} />
              </Route>
              <Route path='meet-the-team' element={<MeetTheTeam />} />
              <Route path='exchanges-mcm' element={<Exchanges />} />
              <Route path='privacy-policy' element={<Privacy />} />
              <Route path='mobile-wallet-privacy' element={<MobileWalletPrivacy />} />
              <Route path='mobile-wallet-terms' element={<MobileWalletTerms />} />
              <Route path='status' element={<Status />} />
              <Route path='network' element={<Navigate replace to='/status' />} />
              <Route path='explorer/*' element={<MochiscanRedirect />} />
              <Route path='mining' element={<Mining />} />
              <Route path='faq' element={<FAQ />} />
              <Route path='vote' element={<Vote />} />
            </Routes>
            </Box>
          </PageBody>
          <Routes>
            <Route path='network' element={null} />
            <Route path='mfx'>
              <Route path='*' element={null} />
            </Route>
            <Route path='*' element={<Footer />} />
          </Routes>
        </Box>
      </BrowserRouter>
      <ScrollToTop />
    </ThemeProvider>
  );
}
