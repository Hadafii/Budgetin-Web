import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Page from '../components/Page';
import '../style/Pengaturan.css';

function Settings({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {

  const handleBackupData = () => {
    alert('Data berhasil dicadangkan ke cloud!');
  };

  const handleRestoreData = () => {
    alert('Data berhasil dipulihkan dari cadangan!');
  };

  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >

        <div className="container mt-4">
          <h1>Pengaturan</h1>
          <Accordion alwaysOpen>

            <Accordion.Item eventKey="0">
              <Accordion.Header>Cadangkan & Pulihkan</Accordion.Header>
              <Accordion.Body>
              <div className="backup-section container ">
                <Col className="">
                  <Row xs={12} sm={6} className=" py-3">
                    <button className="btn btn-primary w-100" onClick={handleBackupData}>
                      Cadangkan Data
                    </button>
                  </Row>
                  <Row xs={12} sm={6}>
                    <button className="btn btn-secondary w-100" onClick={handleRestoreData}>
                      Pulihkan Data
                    </button>
                  </Row>
                </Col>
              </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Informasi Aplikasi</Accordion.Header>
              <Accordion.Body>
                <div>
                  <p className="text-dark"><b>Panduan Penggunaan:</b> Dapatkan tutorial lengkap tentang penggunaan aplikasi ini.</p>
                  <p className="text-dark"><b>Kebijakan Privasi & Syarat Layanan:</b> Ketahui lebih lanjut mengenai kebijakan privasi dan persyaratan penggunaan.</p>
                  <p className="text-dark"><b>Versi Aplikasi:</b> 1.0.0</p>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Logout</Accordion.Header>
              <Accordion.Body>
                <button className="btn btn-danger" onClick={() => alert('Logout berhasil!')}>Keluar dari Akun</button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
    </Page>
  );
}

export default Settings;
