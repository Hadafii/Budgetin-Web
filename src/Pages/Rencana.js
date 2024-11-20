import React, { useState } from 'react';
import Page from '../components/Page';
import { Container, Row, Col } from 'react-bootstrap';
import MonthlyBudgetCard from '../components/MonthlyBudgetCard';
import '../style/Rencana.css'; 
import '../style/Dashboard.css';

function Rencana({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [userToken] = useState(localStorage.getItem('token')); 

  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
        <Container className="mt-4">
          <h2>Rencana Anggaran</h2>
          <Row className="mt-4">
            <Col>
              <MonthlyBudgetCard token={userToken} />
            </Col>
          </Row>
        </Container>
    </Page>
  );
}

export default Rencana;
