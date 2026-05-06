import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './cloud/auth';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
