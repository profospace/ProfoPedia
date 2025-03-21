import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyDashboard from './pages/PropertyDashboard';
// import PropertyRegistryApp from './pages/PropertyRegistryApp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyDashboard />} />
      {/* <Route path="/check" element={<PropertyRegistryApp />} /> */}
    </Routes>
  );
};

export default App;