import React, { useMemo, useState } from 'react';
import { Button, Card, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { BsCheck2 } from 'react-icons/bs';
import WakatimeClient from './utils/WakatimeClient';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';

export default function App() {
  const client = useMemo(() => new WakatimeClient(""), []);
  const [connected, setConnected] = useState(false);

  return (
    <BrowserRouter basename='moneytor'>
      <Routes>
        <Route index element={<Navigate to="landing"/>}/>
        <Route path="landing" element={<Landing client={client} connected={connected} setConnected={setConnected}/>} />
        <Route path="dashboard" element={<Dashboard client={client}/>} />
      </Routes>
    </BrowserRouter>
  );
}