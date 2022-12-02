import React, { useEffect, useState } from 'react';

import './scss/App.global.scss';

import Landing from './components/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';

export default function App() {

  return (
    <BrowserRouter basename='moneytor'>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}
