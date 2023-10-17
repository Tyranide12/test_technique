import React from 'react';
import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PixelFail</h1>
        <h3>La pixelwar mais ... en moins bien</h3>
        <div style={{ fontSize: 12 }}>(Genre beaucoup moins)</div>
      </header>
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
