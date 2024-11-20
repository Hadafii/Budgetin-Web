import React, { useState, useEffect  } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import 'swiper/swiper-bundle.css';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Notifikasi from './Pages/Notifikasi';
import Login from './Pages/Loginform';
import Pengeluaran from './Pages/Pengeluaran';
import Profile from './Pages/Profile';
import Landing from './Pages/LandingPage';
import Test from './Pages/Testpage';

import Rencana from './Pages/Rencana';
import Signin from './Pages/Signinform';
import Laporan from './Pages/Laporan';
import Bantuan from './Pages/Bantuan';
import Pengaturan from './Pages/Pengaturan';
import Pendapatan from './Pages/Pendapatan';
import OTPVerification from './Pages/OTPVerification';
import ProtectedRoute from './Pages/ProtectedRoute';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';



const App = () => {
  const [collapsed, setCollapsed] = useState(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    return savedState ? JSON.parse(savedState) : false;
  });
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Periksa apakah token ada di localStorage saat pertama kali dimuat
    const token = localStorage.getItem("token");
    return !!token; // Jika token ada, anggap pengguna telah login
  });

  const refreshAuthToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      // Panggil API refreshToken
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/refreshToken", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", data.token); // Simpan token baru
          setIsAuthenticated(true); // Tetap authenticated
        } else {
          handleLogout(); // Jika refresh gagal, logout
        }
      } else {
        handleLogout(); // Jika respon bukan 200 OK, logout
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleLogout(); // Logout jika ada masalah
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token
    setIsAuthenticated(false); // Ubah status autentikasi menjadi false
    window.location.href = "/Login"; // Arahkan ke halaman login
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAuthToken();
    }, 15 * 60 * 1000); // Refresh setiap 15 menit

    return () => clearInterval(interval); // Bersihkan interval saat komponen dilepas
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Ubah status autentikasi menjadi true
};
  
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
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<OTPVerification onLoginSuccess={handleLoginSuccess}/>} />

        <Route path="/Dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Signin" element={<Signin collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />

        <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />

        <Route path="/Profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Notification" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Notifikasi collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Rencana" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Rencana collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Pendapatan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Pendapatan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Pengeluaran" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Pengeluaran collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />
        
        <Route path="/Laporan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Laporan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Bantuan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Bantuan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/Pengaturan" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Pengaturan collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} /></ProtectedRoute>} />

        <Route path="/" element={<Landing collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />

        <Route path="/Test" element={<Test collapsed={collapsed} toggleSidebar={toggleSidebar} showOffcanvas={showOffcanvas} handleShowOffcanvas={handleShowOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />} />

      </Routes>
    </Router>
  );
};

export default App;
