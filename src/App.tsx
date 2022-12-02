import React, { useEffect, useState } from 'react';

import './scss/App.global.scss';
import Landing from './components/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authenticate from './components/Authenticate';

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
    <BrowserRouter>
      <Routes>
        <Route path="moneytor">
          <Route index element={<Landing />} />
          <Route path="authenticate" element={<Authenticate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
