import React, { useEffect, useState } from 'react';

import './scss/App.global.scss';

import Landing from './components/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export default function App() {
  const [heartbeat, setHeartbeat] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Heartbeat

      setHeartbeat(Date.now());
    }, 10000);
    return () => clearInterval(interval);
  }, [])


  return (
    <BrowserRouter basename='moneytor'>
      <Routes>
        <Route index element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
