import {Container, Form, Button} from 'react-bootstrap';
import React, { useState } from 'react';
import '../style/Pendapatan.css';
import Sidebar from '../components/Sidebar';
import NavBar from '../components/Navbar';
import Page from '../components/Page';

function Pendapatan({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }){
    return(
      <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
        
        <Container className="pendapatan-container">
        <Form className="pendapatan-form"> 
        <h1><b>Record Pendapatan</b></h1>
        <Form.Group className="mb-3 jenisPemasukan-group" controlId="formJenisPemasukan">
            <Form.Select className="input-field" aria-label="Pilih Jenis Pemasukan Anda">
                  <option value="Pemasukan Harian">Pemasukan Harian</option>
                  <option value="Pemasukan Bulanan">Pemasukan Bulanan</option>
                  <option value="Pemasukan Tahunan">Pemasukan Tahunan</option>
             </Form.Select>
        </Form.Group>
        
        <Form.Group className="mb-3 tglPemasukan-group" controlId="formTanggalPemasukan">
          <Form.Control
            type="date" 
            placeholder="Masukkan Tanggal Pemasukan Income Anda" 
            className="input-field" 
          />
        </Form.Group>

        <Form.Group className="mb-3 sumberPemasukan-group" controlId="formSumberPemaasukan">
            <Form.Select className="input-field" aria-label="Pilih Sumber Pemasukan Anda">
                  <option value="Pekerjaan">Pekerjaan</option>
                  <option value="Bisnis">Bisnis</option>
                  <option value="Investasi">Investasi</option>
                  <option value="Kiriman">Kiriman</option>
             </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3 jumlahPemasukan-group" controlId="formJumlahPemasukan" >
          <Form.Control
            type="number" 
            placeholder="Masukkan Jumlah Income Anda" 
            className="input-field" 
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          className="pendapatan-button"
        >
          Confirm
        </Button>
        </Form>
        </Container>
    </Page>
    )
}

export default Pendapatan;