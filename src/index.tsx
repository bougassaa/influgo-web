import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./layouts/App";
import './styles/app.css';
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);

