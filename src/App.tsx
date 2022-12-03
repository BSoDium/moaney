import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';


export default function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="landing" />} />
          <Route path="landing" element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
  );
}