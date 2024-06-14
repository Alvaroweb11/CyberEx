import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigation } from './routes';
import reportWebVitals from './reportWebVitals';
import { store } from "./store";
import { Provider } from "react-redux";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Navigation />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();