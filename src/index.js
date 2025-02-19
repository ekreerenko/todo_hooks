import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './scripts';

const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
