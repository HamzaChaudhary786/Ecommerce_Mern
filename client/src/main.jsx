import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js'; // Adjust path if needed
import { BrowserRouter as Router, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import router from './routes/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        
        <RouterProvider router={router} />

      </PersistGate>
    </Provider>
  // </React.StrictMode>,
);