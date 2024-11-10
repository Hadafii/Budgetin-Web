import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import '../style/PengeluaranSummary.css';
import NavBar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

function PengeluaranSummary(collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas) {
  return (
    <div className="d-flex" >
     <Sidebar isCollapsed={collapsed} showOffcanvas={showOffcanvas} handleCloseOffcanvas={handleCloseOffcanvas} />

      <div className="flex-grow-1 d-flex flex-column">
        <NavBar toggleSidebar={toggleSidebar} handleShowOffcanvas={handleShowOffcanvas} />
        <Container fluid className="Pengeluaran-summary-container">
          <Row className="flex-grow-1">
            <Col>
              <div className="Pengeluaran-summary">
                <h1><b>Identifikasi Pengeluaran</b></h1>
                <p>Berikut rincian pengeluaran anda</p>

                <div className="summary-content text-start">
                  <span className="date fw-bold">{getCurrentDate()}</span>
                  
                  <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between pt-5">
                      <div>Makan</div>
                      <div>Rp. x.xxx.xxx</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <div>Transportasi</div>
                      <div>Rp. x.xxx.xxx</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between">
                      <div>Jajan</div>
                      <div>Rp. x.xxx.xxx</div>
                    </ListGroup.Item>
                  </ListGroup>
                </div>

                <div className="total-row">
                  <span>Total Pengeluaran</span>
                  <span className="amount">Rp. xx.xxx.xxx</span>
                </div>

                <div className="saldo-row">
                  <span>Sisa Saldo</span>
                  <span className="amount">Rp. xx.xxx.xxx</span>
                </div>
                <div className="text-start pt-3">
                  <Button variant="primary" className="btn-back " href="/Pengeluaran">
                    Kembali
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default PengeluaranSummary;
