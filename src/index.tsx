import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import InMemoryHeroContextProvider from './InMemoryHeroContextProvider';
import MessageContextProvider from './MessageContextProvider';

import './index.css';

// <HashRouter> used here because GitHub Pages doesn't support BrowserRouter
ReactDOM.render(
  <React.StrictMode>
    <MessageContextProvider>
      <InMemoryHeroContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </InMemoryHeroContextProvider>
    </MessageContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
