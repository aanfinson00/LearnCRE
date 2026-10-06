import { lazy, Suspense, useEffect, useState } from 'react';
import { hasEnteredApp, markEnteredApp, markWelcomeSeen } from './storage/onboarding';
import { currentAppPath, navigateToMode, useHashRouting } from './router';
import { RouteFallback } from './components/RouteFallback';
import { trackPageview } from './analytics';

// The landing page and the app are separate chunks: a first-time visitor
// never downloads the app shell (or Supabase) just to see the marketing page.
const LandingPage = lazy(() =>
  import('./components/LandingPage').then((m) => ({ default: m.LandingPage })),
);
const AppRoot = lazy(() => import('./AppRoot'));

/** `/welcome` always shows the landing page (shareable marketing link);
 *  `/` shows it only to browsers that haven't entered the app yet. */
function shouldShowLanding(): boolean {
  if (typeof window === 'undefined') return false;
  if (!useHashRouting && window.location.pathname.replace(/\/+$/, '') === '/welcome') return true;
  if (currentAppPath() !== '/') return false;
  if (!useHashRouting && window.location.pathname !== '/') return false;
  // Magic-link callbacks land on `/` with auth params; send them to the app.
  if (window.location.search || window.location.hash.includes('access_token')) return false;
  return !hasEnteredApp();
}

export default function App() {
  const [landing, setLanding] = useState<boolean>(shouldShowLanding);
  const [quickStart, setQuickStart] = useState(false);

  useEffect(() => {
    if (landing) trackPageview(window.location.pathname, { page: 'landing' });
  }, [landing]);

  return (
    <Suspense fallback={<RouteFallback />}>
      {landing ? (
        <LandingPage
          onEnter={({ quickStart: qs }) => {
            markEnteredApp();
            // The landing page already covers what the welcome slides explain.
            markWelcomeSeen();
            navigateToMode('quiz');
            setQuickStart(qs);
            setLanding(false);
          }}
        />
      ) : (
        <AppRoot quickStart={quickStart} />
      )}
    </Suspense>
  );
}
