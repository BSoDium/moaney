import React, { useState } from 'react';

import './scss/App.global.scss';

export default function App() {
  const [time, setTime] = useState(0);
  
  return (
    <div className="container">
      <h1>Moaney</h1>
    </div>
  );
}
