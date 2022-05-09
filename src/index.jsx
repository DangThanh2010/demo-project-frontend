import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './redux/store';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
