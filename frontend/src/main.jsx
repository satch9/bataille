import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'
import { IoProvider } from './context/IoContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <IoProvider>

        <App />

      </IoProvider>
    </Router>
  </React.StrictMode>,
)
