import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// After a redeploy, an open tab may ask for chunk files that no longer exist.
// Reload once to pick up the new build instead of showing a broken screen.
window.addEventListener('vite:preloadError', (event) => {
  try {
    const key = 'learncre.chunkReload';
    const last = Number(sessionStorage.getItem(key) ?? 0);
    if (Date.now() - last < 10_000) return; // already retried; don't loop
    sessionStorage.setItem(key, String(Date.now()));
  } catch {
    /* storage blocked: still worth one reload */
  }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
