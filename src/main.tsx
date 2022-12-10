import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Меняем на Hash чтобы локально на  ПК работали ссылки корректно */}
    <HashRouter>
    {/* <BrowserRouter> */}
    <App />
    </HashRouter>
    {/* </BrowserRouter> */}
  </React.StrictMode>
)
