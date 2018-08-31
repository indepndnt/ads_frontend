import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import App from './App';
// Excluding service worker because I want this to be a web page and allow API calls to subfolders.
// React should only respond when the root index is requested (e.g. https://www.accountingdatasolutions.com/index.html)
// import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
unregister();

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
