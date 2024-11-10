import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Page from '../components/Page';
import { Container, Card, ListGroup, Row, Col } from 'react-bootstrap';
import '../style/Rencana.css'; 
import '../style/Dashboard.css';

function Rencana({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [budgetType, setBudgetType] = useState('Harian');

  
  const handleBudgetTypeChange = (event) => {
    setBudgetType(event.target.value);
  };


  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
        <Container className="rencana-container p-4">
          <Row>
            <Col>
              <Form className="rencana-form">
                <h1><b>Rencana Anggaran</b></h1>
                
                <Form.Group className="mb-3" controlId="formBudgetType">
                  <Form.Label>Pilih Jenis yang Anda Inginkan</Form.Label>
                  <Form.Select 
                    className=""
                    value={budgetType}
                    onChange={handleBudgetTypeChange}
                  >
                    <option value="Harian"><b>Harian</b></option>
                    <option value="Mingguan"><b>Mingguan</b></option>
                    <option value="Bulanan"><b>Bulanan</b></option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="saldoagang">
                  <Form.Label>Total Saldo</Form.Label>
                  <div className="input-field">
                    <strong>Rp. xx.xxx.xxx</strong> 
                  </div>
                </Form.Group>
                
                <Card className="mb-3 budget-summary">
                  <Card.Body>
                    <h5>{budgetType}</h5>

                    <ListGroup variant="flush">
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div>Estimasi Pengeluaran</div>
                        <div>Jumlah</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <img src="https://img.icons8.com/?size=100&id=49319&format=png&color=000000" alt="icon" className="icon-image" style={{ width: '50px' }}
                          />
                          <div className="ms-3">Tagihan</div>
                        </div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between ">
                      <div className="d-flex align-items-center">
                        <img src="https://img.icons8.com/?size=100&id=46548&format=png&color=000000" alt="icon" className="icon-image" style={{ width: '50px' }}
                        />
                        <div className="ms-3"></div>   Makanan</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                      <div className="d-flex align-items-center">
                        <img src="https://img.icons8.com/?size=100&id=46804&format=png&color=000000" alt="icon" className="icon-image" style={{ width: '50px' }}
                        />
                        <div className="ms-3"></div>Transportasi</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                        <img src="https://img.icons8.com/?size=100&id=-fKpN-2YaOXV&format=png&color=000000" alt="icon" className="icon-image" style={{ width: '50px' }}
                        />
                        <div className="ms-3"></div>Hiburan</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div>Estimasi Pengeluaran Tambahan</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div>Estimasi Dana Darurat</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                      <ListGroup.Item className="d-flex justify-content-between">
                        <div>Estimasi Uang yang Ditabung</div>
                        <div>Rp. xx.xxx.xxx</div>
                      </ListGroup.Item>
                    </ListGroup>

                    <div className="d-flex flex-column align-items-end mt-4">
                      <div className="import-buttons">
                        <Button variant="secondary" className="me-2">Rancangan Anggaran .pdf</Button>
                        <Button variant="secondary">Rancangan Anggaran .xls</Button>
                      </div>
                      <Button variant="primary" className="mt-3 confirm-button">Confirm</Button>
                    </div>

                  </Card.Body>
                </Card>
              </Form>
            </Col>
          </Row>
        </Container>
    </Page>
  );
}

export default Rencana;
