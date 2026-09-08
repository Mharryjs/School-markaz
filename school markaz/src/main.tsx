import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SchoolProvider } from './context/SchoolContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </StrictMode>,
);

