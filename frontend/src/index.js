import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Routes from './Routes'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './redux/reducers/LoginReducer';


const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    login: loginReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})

root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

