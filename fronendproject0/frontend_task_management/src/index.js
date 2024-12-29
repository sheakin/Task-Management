import React from 'react';
import reactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import store from './store/store';
import {Provider} from 'react-redux';
const root = reactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  
    <RouterProvider router={router}/>
  
</Provider>
);

reportWebVitals();