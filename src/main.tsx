import '@vkontakte/vkui/dist/vkui.css';
import '@/styles/global.css';
import '@/styles/components.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';

import { Threshold } from './Threshold';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <StrictMode>
        <Threshold />
    </StrictMode>
);
