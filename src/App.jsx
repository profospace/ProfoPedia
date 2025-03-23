// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import PropertyDashboard from './pages/PropertyDashboard';
// import PartyNameSearch from './components/PartyNameSearch';
// import DeedDashboard from './pages/DeedDashboard';
// // import PropertyRegistryApp from './pages/PropertyRegistryApp';

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<PropertyDashboard />} />
//       <Route path="/testing" element={<DeedDashboard />} />
//       {/* <Route path="/testing" element={<PartyNameSearch />} /> */}
//       {/* <Route path="/check" element={<PropertyRegistryApp />} /> */}
//     </Routes>
//   );
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AllDeeds from './pages/AllDeeds';
import DeedDetails from './pages/DeedDetails';
// import Analytics from './pages/Analytics';
import UploadDeeds from './pages/UploadDeeds';
import axios from 'axios';
import PropertyDashboard from './pages/PropertyDashboard';
// import Parties from './pages/Parties';
import Settings from './pages/Settings';
import { base_url } from './utils/base_url';


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deeds, setDeeds] = useState([])

  useEffect(() => {
    // Fetch initial statistics
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/stats');
      setStats(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeedData = async () => {
    const response = await axios.get(`${base_url}/deeds/get-all-deeds`);
    setDeeds(response.data.data);

  }

  useEffect(
    () => {
      fetchDeedData()

    }, []
  )

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard
                    deeds={deeds}
                    stats={stats}
                    loading={loading}
                    error={error}
                    refresh={fetchStats}
                  />
                }
              />

              <Route path="/test" element={<PropertyDashboard />} />
              <Route path="/deeds" element={<AllDeeds deeds={deeds} setDeeds={setDeeds}/>} />
              <Route path="/deeds/:id" element={<DeedDetails />} />
              {/* <Route path="/analytics" element={<Analytics />} /> */}
              <Route path="/upload" element={<UploadDeeds refresh={fetchStats} />} />
              {/* <Route path="/parties" element={<Parties />} /> */}
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}


export default App;