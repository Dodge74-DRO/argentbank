import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import DefaultRouter from '../src/Router/Router.jsx'
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <DefaultRouter />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
);
