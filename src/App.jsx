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


// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import AllDeeds from './pages/AllDeeds';
// import DeedDetails from './pages/DeedDetails';
// // import Analytics from './pages/Analytics';
// import UploadDeeds from './pages/UploadDeeds';
// import axios from 'axios';
// import PropertyDashboard from './pages/PropertyDashboard';
// // import Parties from './pages/Parties';
// import Settings from './pages/Settings';
// import { base_url } from './utils/base_url';


// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState()

//   const [deeds, setDeeds] = useState([])
//   const [allDistricts, setAllDistricts] = useState([])
//   const [district , setDistrict] = useState('')

//   console.log("All Districts" , allDistricts)
//   console.log("Seelcted district" ,district )
//   useEffect(() => {
//     // Fetch initial statistics
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/stats');
//       setStats(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error('Error fetching stats:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchAllDistricts = async () => {
//     const response = await axios.get(`${base_url}/deeds/get/districts`);
//     setAllDistricts(response?.data?.data)

//   }

//   const fetchDeedData = async () => {
//     const response = await axios.get(`${base_url}/deeds/get-all-deeds`);
//     setDeeds(response.data.data);

//   }

//   useEffect(
//     () => {
//       fetchDeedData()
      
//     }, [district]
//   )
  
//   useEffect(
//     ()=>{
      
//       fetchAllDistricts()
//     },[]
//   )

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} allDistricts={allDistricts} district={district} setDistrict={setDistrict} />

//         <main className="flex-1 overflow-y-auto overflow-x-hidden">
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <Dashboard
//                     deeds={deeds}
//                     stats={stats}
//                     loading={loading}
//                     error={error}
//                     refresh={fetchStats}
//                   />
//                 }
//               />

//               <Route path="/test" element={<PropertyDashboard />} />
//               <Route path="/deeds" element={<AllDeeds deeds={deeds} setDeeds={setDeeds} />} />
//               <Route path="/deeds/:id" element={<DeedDetails />} />
//               {/* <Route path="/analytics" element={<Analytics />} /> */}
//               <Route path="/upload" element={<UploadDeeds refresh={fetchStats} />} />
//               {/* <Route path="/parties" element={<Parties />} /> */}
//               <Route path="/settings" element={<Settings />} />
//               <Route path="*" element={<Navigate to="/" replace />} />

//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import AllDeeds from './pages/AllDeeds';
// import DeedDetails from './pages/DeedDetails';
// // import Analytics from './pages/Analytics';
// import UploadDeeds from './pages/UploadDeeds';
// import axios from 'axios';
// import PropertyDashboard from './pages/PropertyDashboard';
// // import Parties from './pages/Parties';
// import Settings from './pages/Settings';
// import { base_url } from './utils/base_url';


// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState()

//   const [deeds, setDeeds] = useState([])
//   const [allDistricts, setAllDistricts] = useState([])
//   const [district, setDistrict] = useState('')

//   console.log("All Districts", allDistricts)
//   console.log("Selected district", district)

//   useEffect(() => {
//     // Fetch initial statistics
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/stats');
//       setStats(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error('Error fetching stats:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchAllDistricts = async () => {
//     try {
//       const response = await axios.get(`${base_url}/deeds/get/districts`);
//       setAllDistricts(response?.data?.data);
//     } catch (err) {
//       console.error('Error fetching districts:', err);
//     }
//   }

//   const fetchDeedData = async () => {
//     try {
//       // Create URL with query parameters
//       let url = `${base_url}/deeds/get-all-deeds`;

//       // Add district filter if a district is selected
//       if (district) {
//         url += `?district=${encodeURIComponent(district)}`;
//       }

//       const response = await axios.get(url);
//       setDeeds(response.data.data);
//     } catch (err) {
//       console.error('Error fetching deeds:', err);
//     }
//   }

//   // Fetch deeds when district changes
//   useEffect(() => {
//     fetchDeedData();
//   }, [district]);

//   // Fetch districts on component mount
//   useEffect(() => {
//     fetchAllDistricts();
//   }, []);

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} allDistricts={allDistricts} district={district} setDistrict={setDistrict} />

//         <main className="flex-1 overflow-y-auto overflow-x-hidden">
//           <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <Dashboard
//                     deeds={deeds}
//                     stats={stats}
//                     loading={loading}
//                     error={error}
//                     refresh={fetchStats}
//                   />
//                 }
//               />

//               <Route path="/test" element={<PropertyDashboard />} />
//               <Route path="/deeds" element={<AllDeeds deeds={deeds} setDeeds={setDeeds} district={district} />} />
//               <Route path="/deeds/:id" element={<DeedDetails />} />
//               {/* <Route path="/analytics" element={<Analytics />} /> */}
//               <Route path="/upload" element={<UploadDeeds refresh={fetchStats} />} />
//               {/* <Route path="/parties" element={<Parties />} /> */}
//               <Route path="/settings" element={<Settings />} />
//               <Route path="*" element={<Navigate to="/" replace />} />

//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// export default App;

// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Dashboard from './pages/Dashboard';
// import AllDeeds from './pages/AllDeeds';
// import DeedDetails from './pages/DeedDetails';
// // import Analytics from './pages/Analytics';
// import UploadDeeds from './pages/UploadDeeds';
// import axios from 'axios';
// import PropertyDashboard from './pages/PropertyDashboard';
// // import Parties from './pages/Parties';
// import Settings from './pages/Settings';
// import { base_url } from './utils/base_url';


// function App() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [stats, setStats] = useState()

//   const [deeds, setDeeds] = useState([])
//   const [allDistricts, setAllDistricts] = useState([])

//   // Load the district from localStorage or default to empty string
//   const [district, setDistrict] = useState(() => {
//     const savedDistrict = localStorage.getItem('selectedDistrict');
//     return savedDistrict || '';
//   });

//   console.log("All Districts", allDistricts)
//   console.log("Selected district", district)
//   console.log("deeds", deeds)

//   // Save district to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('selectedDistrict', district);
//   }, [district]);

//   useEffect(() => {
//     // Fetch initial statistics
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('/stats');
//       setStats(response.data.data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load dashboard data. Please try again later.');
//       console.error('Error fetching stats:', err);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchAllDistricts = async () => {
//     try {
//       const response = await axios.get(`${base_url}/deeds/get/districts`);
//       setAllDistricts(response?.data?.data);
//     } catch (err) {
//       console.error('Error fetching districts:', err);
//     }
//   }

//   const fetchDeedData = async () => {
//     try {
//       // Create URL with query parameters
//       let url = `${base_url}/deeds/get-all-deeds`;

//       // Add district filter if a district is selected
//       if (district) {
//         url += `?district=${encodeURIComponent(district)}`;
//       }

//       const response = await axios.get(url);
//       setDeeds(response.data.data);
//     } catch (err) {
//       console.error('Error fetching deeds:', err);
//     }
//   }

//   // Fetch deeds when district changes
//   useEffect(() => {
//     fetchDeedData();
//   }, [district]);

//   // Fetch districts on component mount
//   useEffect(() => {
//     fetchAllDistricts();
//   }, []);

//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       {/* Content area */}
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} allDistricts={allDistricts} district={district} setDistrict={setDistrict} />

//         <main className="flex-1 overflow-y-auto overflow-x-hidden">
//           <div className="px-4 sm:px-6 lg:px-2 py-2 w-full max-w-9xl mx-auto">
//             <Routes>
//               <Route
//                 path="/"
//                 element={
//                   <Dashboard
//                     deeds={deeds}
//                     stats={stats}
//                     loading={loading}
//                     error={error}
//                     refresh={fetchStats}
//                   />
//                 }
//               />

//               <Route path="/test" element={<PropertyDashboard />} />
//               <Route path="/deeds" element={<AllDeeds deeds={deeds} setDeeds={setDeeds} district={district} />} />
//               <Route path="/deeds/:id" element={<DeedDetails />} />
//               {/* <Route path="/analytics" element={<Analytics />} /> */}
//               <Route path="/upload" element={<UploadDeeds refresh={fetchStats} />} />
//               {/* <Route path="/parties" element={<Parties />} /> */}
//               <Route path="/settings" element={<Settings />} />
//               <Route path="*" element={<Navigate to="/" replace />} />

//             </Routes>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import AllDeeds from './pages/AllDeeds';
import DeedDetails from './pages/DeedDetails';
import UploadDeeds from './pages/UploadDeeds';
import axios from 'axios';
import PropertyDashboard from './pages/PropertyDashboard';
import Settings from './pages/Settings';
import { base_url } from './utils/base_url';

// Import new components for property analysis
import PropertyInsightsDashboard from './components/PropertyInsightsDashboard';
import PropertyOutliers from './components/PropertyOutliers';
import PropertyPriceAnalyzer from './components/PropertyPriceAnalyzer';
import PropertyPredictionDashboard from './components/PropertyPredictionDashboard';
import FamilyPropertyTransferTracker from './components/FamilyPropertyTransferTracker';
import SeasonalTransactionPatterns from './components/SeasonalTransactionPatterns';
import TransactionVolumeForecastingTool from './components/TransactionVolumeForecastingTool';
import PropertyValueEstimator from './components/PropertyValueEstimator';
import PropertyComparisonTool from './components/PropertyComparisonTool';
import TimelineVisualization from './components/TimelineVisualization';
import GeographicDistributionMap from './components/GeographicDistributionMap';
import TopLocalitiesByTransactions from './components/TopLocalitiesByTransactions';
import RealEstateMarketDashboard from './components/RealEstateMarketDashboard';
import AffordabilityIndexAnalysis from './components/AffordabilityIndexAnalysis';
import MohallaChartWithDropDown from './components/MohallaChartWithDropDown';
import PropertyValueHistogram from './components/PropertyValueHistogram';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState()

  const [deeds, setDeeds] = useState([])
  const [allDistricts, setAllDistricts] = useState([])

  // Load the district code from localStorage or default to empty string
  const [district, setDistrict] = useState(() => {
    const savedDistrict = localStorage.getItem('selectedDistrictCode');
    return savedDistrict || '';
  });

  console.log("All Districts", allDistricts)
  console.log("Selected district", district)
  console.log("deeds", deeds)

  // Save district code to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedDistrictCode', district);
  }, [district]);

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


  const fetchAllDistricts = async () => {
    try {
      const response = await axios.get(`${base_url}/deeds/get/districts`);
      setAllDistricts(response?.data?.data);
    } catch (err) {
      console.error('Error fetching districts:', err);
    }
  }

  const fetchDeedData = async () => {
    try {
      // Create URL with query parameters
      let url = `${base_url}/deeds/get-all-deeds`;

      // Add district filter if a district is selected
      if (district) {
        url += `?district=${encodeURIComponent(district)}`;
      }

      const response = await axios.get(url);
      setDeeds(response.data.data);
    } catch (err) {
      console.error('Error fetching deeds:', err);
    }
  }

  // Fetch deeds when district changes
  useEffect(() => {
    fetchDeedData();
  }, [district]);

  // Fetch districts on component mount
  useEffect(() => {
    fetchAllDistricts();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} allDistricts={allDistricts} district={district} setDistrict={setDistrict} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="px-4 sm:px-6 lg:px-2 py-2 w-full max-w-9xl mx-auto">
            <Routes>
              {/* Main routes */}
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
              <Route path="/deeds" element={<AllDeeds deeds={deeds} setDeeds={setDeeds} district={district} />} />
              <Route path="/deeds/:id" element={<DeedDetails />} />
              <Route path="/upload" element={<UploadDeeds refresh={fetchStats} />} />
              <Route path="/settings" element={<Settings />} />

              {/* Property Analysis Routes */}
              <Route path="/property-insights" element={<PropertyInsightsDashboard data={deeds} />} />
              <Route path="/property-outliers" element={<PropertyOutliers data={deeds} />} />
              <Route path="/price-analyzer" element={<PropertyPriceAnalyzer propertyData={deeds} />} />
              <Route path="/property-prediction" element={<PropertyPredictionDashboard data={deeds} />} />
              <Route path="/value-estimator" element={<PropertyValueEstimator data={deeds} />} />
              <Route path="/property-comparison" element={<PropertyComparisonTool data={deeds} />} />

              {/* Market Analysis Routes */}
              <Route path="/market-dashboard" element={<RealEstateMarketDashboard data={deeds} />} />
              <Route path="/affordability-index" element={<AffordabilityIndexAnalysis data={deeds} />} />
              <Route path="/seasonal-patterns" element={<SeasonalTransactionPatterns data={deeds} />} />
              <Route path="/transaction-forecast" element={<TransactionVolumeForecastingTool data={deeds} />} />

              {/* Location & History Routes */}
              <Route path="/geographic-map" element={<GeographicDistributionMap data={deeds} />} />
              <Route path="/top-localities" element={<TopLocalitiesByTransactions data={deeds} />} />
              <Route path="/timeline" element={<TimelineVisualization data={deeds} />} />
              <Route path="/family-transfers" element={<FamilyPropertyTransferTracker data={deeds} />} />
              <Route path="/mohalla-charts" element={<MohallaChartWithDropDown data={deeds} />} />
              <Route path="/last-transaction-finder" element={<PropertyValueHistogram data={deeds} />} />

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

