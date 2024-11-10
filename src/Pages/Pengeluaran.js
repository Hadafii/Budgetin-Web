import React, { useState } from 'react';
import Page from '../components/Page';
import { Container, Row, Col , Button, Form} from 'react-bootstrap';
import '../style/Pengeluaran.css';

function Pengeluaranform({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [jumlahPengeluaran, setJumlahPengeluaran] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (jumlahPengeluaran <= 0) {
      setError('Jumlah pengeluaran harus lebih dari 0!');
    } else {
      setError('');
      console.log('Data valid:', { jumlahPengeluaran });
    }
  };
  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
        <Container className="Pengeluaran-container">
          <Row>
            <Col>
              <Form className="Pengeluaran-form" onSubmit={handleSubmit}>
                <h1><b>Identifikasi Pengeluaran</b></h1>

                <Form.Group className="mb-3 tglPengeluaran-group" controlId="formTanggalPengeluaran">
                  <Form.Label>Masukkan Tanggal Pengeluaran Anda</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Tanggal Pengeluaran"
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group className="mb-3 tglPengeluaran-group" controlId="formTujuanPengeluaran">
                  <Form.Label>Masukkan Tujuan Pengeluaran Anda</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Tujuan"
                    className="input-field"
                  />
                </Form.Group>

                <Form.Group className="mb-3 tglPengeluaran-group" controlId="formJumlahPengeluaran">
                  <Form.Label>Masukkan Jumlah Pengeluaran Anda</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Rp. Jumlah"
                    className="input-field"
                    value={jumlahPengeluaran}
                    onChange={(e) => setJumlahPengeluaran(e.target.value)}
                  />
                  {error && <div className="text-danger">{error}</div>}
                </Form.Group>

                <Button id="submit" type="submit" href="/PengeluaranSummary">
                  Confirm
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
    </Page>
  );
}

export default Pengeluaranform;
