import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Mengimpor komponen utama aplikasi
import './index.css'; // Mengimpor file CSS untuk styling

// Memulai aplikasi dan me-render komponen `App` di dalam elemen dengan id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
