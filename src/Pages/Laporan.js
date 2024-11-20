import React from 'react';
import Page from '../components/Page';
import RecentActivity from '../components/RecentActivity'; 

function LaporanKeuangan({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  return (
    <Page 
      collapsed={collapsed} 
      toggleSidebar={toggleSidebar} 
      showOffcanvas={showOffcanvas}
      handleShowOffcanvas={handleShowOffcanvas}
      handleCloseOffcanvas={handleCloseOffcanvas}
    >
      <div className="container mt-4">
        <RecentActivity />
      </div>
    </Page>
  );
}

export default LaporanKeuangan;