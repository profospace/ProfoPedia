// import React from 'react'
// import TehsilMohallaDashboard from './pages/TehsilMohallaDashboard'
// import VillageCodeConverter from './pages/VillageCodeConverter'
// import {Router , Route} from "react-router-dom"

// function App() {
//   return (
//     <div>
//       <TehsilMohallaDashboard />
//       <VillageCodeConverter />
//     </div>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TehsilMohallaDashboard from './pages/TehsilMohallaDashboard';
import SavedRecords from './pages/SavedRecords';
import PropertyDashboard from './pages/PropertyDashboard';

const App = () => {
  return (
      <Routes>
      <Route path="/" element={<PropertyDashboard />} />
        {/* <Route path="/" element={<TehsilMohallaDashboard />} />
        <Route path="/saved-records" element={<SavedRecords />} /> */}
      </Routes>
  );
};

export default App;