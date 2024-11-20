import React from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import '../Component Style/SideBar.css';
import "../style/Page.css";

const Sidebar = ({ isCollapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/Login";
  };

  return (
    <>
      {/* Sidebar untuk layar besar */}
      <div className={`sidebar d-none d-lg-flex flex-column bg-light shadow  vh-100 sticky-top  ${isCollapsed ? 'collapsed' : ''}`}>
        <Nav className="flex-column mt-5">
          <Nav.Link href="/Dashboard" className={`d-flex align-items-center p-3 px-4 mt-3 ${isActive('/Dashboard') ? 'active' : ''}`}>
            <i className="bi bi-grid-fill me-2"></i>
            {!isCollapsed && <span>Dashboard</span>}
          </Nav.Link>
          <Nav.Link href="/Rencana" className={`d-flex align-items-center p-3 px-4 ${isActive('/Rencana') ? 'active' : ''}`}>
            <i className="bi bi-calendar2-check-fill me-2"></i>
            {!isCollapsed && <span>Rencana Anggaran</span>}
          </Nav.Link>
          <Nav.Link href="/Notification" className={`d-flex align-items-center p-3 px-4 ${isActive('/Notification') ? 'active' : ''}`}>
            <i className="bi bi-bell-fill me-2"></i>
            {!isCollapsed && <span>Notifikasi</span>}
          </Nav.Link>
          <Nav.Link href="/Laporan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Laporan') ? 'active' : ''}`}>
            <i className="bi bi-bar-chart-line-fill me-2"></i>
            {!isCollapsed && <span>Laporan Keuangan</span>}
          </Nav.Link>
            <hr />
          <Nav.Link href="/Pengaturan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Pengaturan') ? 'active' : ''}`}>
            <i className="bi bi-gear-fill me-2"></i>
            {!isCollapsed && <span>Pengaturan</span>}
          </Nav.Link>
        </Nav>
        <Nav className="flex-column mt-auto">
          <Nav.Link href="/Bantuan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Bantuan') ? 'active' : ''}`}>
            <i className="bi bi-question-circle-fill me-2"></i>
            {!isCollapsed && <span>Bantuan</span>}
          </Nav.Link>
          <Nav.Link onClick={handleLogout} className="d-flex align-items-center p-3 px-4" style={{color:'red'}} >
            <i className="bi bi-box-arrow-left me-2"></i>
            {!isCollapsed && <span>Keluar</span>}
          </Nav.Link>
          <button 
            onClick={toggleSidebar} 
            className="btn toggle-btn-asoy text-white shadow"
            
          >
            <i className={`bi ${isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
          </button>
        </Nav>
      </div>

      {/* Tombol Offcanvas khusus layar kecil */}
      {showOffcanvas || (
        <button 
          onClick={handleShowOffcanvas} 
          className="btn  toggle-btn-asoy-mobile d-lg-none text-white shadow"
        >
          <i className="bi-chevron-right"></i>
        </button>
      )}

      {/* Offcanvas untuk layar kecil */}
      <Offcanvas  show={showOffcanvas} onHide={handleCloseOffcanvas} scroll={true} backdrop={true} className="bg-light custom-offcanvas overflow-auto">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/Dashboard" className={`d-flex align-items-center p-3 px-4 ${isActive('/Dashboard') ? 'active' : ''}`}>
              <i className="bi bi-grid-fill me-2"></i>
              <span>Dashboard</span>
            </Nav.Link>
            <Nav.Link href="/Rencana" className={`d-flex align-items-center p-3 px-4 ${isActive('/Rencana') ? 'active' : ''}`}>
              <i className="bi bi-calendar2-check-fill me-2"></i>
              <span>Rencana Anggaran</span>
            </Nav.Link>
            <Nav.Link href="/Notification" className={`d-flex align-items-center p-3 px-4 ${isActive('/Notification') ? 'active' : ''}`}>
              <i className="bi bi-bell-fill me-2"></i>
              <span>Notifikasi</span>
            </Nav.Link>
            <Nav.Link href="/Laporan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Laporan') ? 'active' : ''}`}>
              <i className="bi bi-bar-chart-line-fill me-2"></i>
              <span>Laporan Keuangan</span>
            </Nav.Link>
            <hr />
            <Nav.Link href="/Pengaturan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Pengaturan') ? 'active' : ''}`}>
              <i className="bi bi-gear-fill me-2"></i>
              <span>Pengaturan</span>
            </Nav.Link>
          </Nav>
          <Nav className="flex-column mt-auto">
            <Nav.Link href="/Bantuan" className={`d-flex align-items-center p-3 px-4 ${isActive('/Bantuan') ? 'active' : ''}`}>
              <i className="bi bi-question-circle-fill me-2"></i>
              <span>Bantuan</span>
            </Nav.Link>
            <Nav.Link onClick={handleLogout} className="d-flex align-items-center p-3 px-4 " >
              <i className="bi bi-box-arrow-left me-2" ></i>
              <span>Keluar</span>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
