import React, { useMemo, useState } from 'react';
import { Button, Card, Input, Loading, Spacer, Text } from '@nextui-org/react';
import { BsCheck2 } from 'react-icons/bs';
import Client from './utils/Client';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';


export default function App() {

  return (
      <BrowserRouter basename='moneytor'>
        <Routes>
          <Route index element={<Navigate to="landing" />} />
          <Route path="landing" element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}