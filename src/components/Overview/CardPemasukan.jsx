// CardPemasukan.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const CardPemasukan = () => {
  return (
    <Card className="p-4 shadow-sm rounded-4" style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-heart-fill fs-2 text-primary" style={{ marginRight: '15px' }}></i>
          <div>
            <h6 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#1B1B1B' }}>Pemasukan</h6>
            <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>
              <i className="bi bi-arrow-up-right text-primary" style={{ fontSize: '1rem', marginRight: '5px' }}></i>
              8 % Dibanding bulan kemarin!
            </p>
          </div>
        </div>
        
        <hr style={{ borderTop: '1px solid rgba(0, 0, 0, 0.1)', margin: '1rem 0' }} />
        
        <div className="d-flex justify-content-between align-items-center">
          <h1 style={{ fontWeight: 'bold', fontSize: '2.2rem', color: '#1B1B1B' }}>Rp. 3.477.200</h1>
          <a href="/Laporan" style={{ color: '#1B1B1B' }}>
            <i className="bi bi-arrow-right fs-4"></i>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPemasukan;
