import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './analytics';
import './fonts';
import './index.css';

const root = document.getElementById('root')!;
// Production HTML is pre-rendered, so attach to it. The dev server starts empty.
if (root.firstElementChild) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
document.documentElement.classList.add("ready");
