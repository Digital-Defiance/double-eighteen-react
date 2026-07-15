import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// HashRouter keeps deep links (e.g. #/harness/trains) working on static hosts
// like GitHub Pages without server-side rewrites.
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
