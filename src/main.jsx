import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "react-toastify/dist/ReactToastify.css";
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <>
    <App />
    <ToastContainer />
  </>
  // </React.StrictMode>,
)
