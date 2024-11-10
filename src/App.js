import React, { useState  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper-bundle.css';

import Dashboard from './Pages/Dashboard';
import Notifikasi from './Pages/Notifikasi';
import Login from './Pages/Loginform';
import Pengeluaran from './Pages/Pengeluaran';
import PengeluaranSummary from './Pages/PengeluaranSummary';
import Profile from './Pages/Profile';
import Landing from './Pages/LandingPage';
import Test from './Pages/Testpage';

import Rencana from './Pages/Rencana';
import Signin from './Pages/Signinform';
import Laporan from './Pages/Laporan';
import Bantuan from './Pages/Bantuan';
import Pengaturan from './Pages/Pengaturan';
import Pendapatan from './Pages/Pendapatan';



const App = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  // Fungsi untuk mengubah status collapse dan simpan ke localStorage
  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newCollapsedState));
  };

  const handleShowOffcanvas = () => setShowOffcanvas(true); 
  const handleCloseOffcanvas = () => setShowOffcanvas(false); 

  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Signin" element={<Signin collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Login" element={<Login collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Profile" element={<Profile collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Notification" element={<Notifikasi collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Rencana" element={<Rencana collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Pendapatan" element={<Pendapatan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Pengeluaran" element={<Pengeluaran collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/PengeluaranSummary" element={<PengeluaranSummary collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Laporan" element={<Laporan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Bantuan" element={<Bantuan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Pengaturan" element={<Pengaturan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/" element={<Landing collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
        <Route path="/Test" element={<Test collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />
      </Routes>
    </Router>
  );
};

export default App;
