import React, { useState } from 'react';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Page from '../components/Page';
import { Line } from 'react-chartjs-2'; 
import 'chart.js/auto'; 
import '../style/laporan.css';

function LaporanKeuangan({collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas}) {
  const [sortBy, setSortBy] = useState('date'); 
  const transactions = [
    { id: 1, name: 'Netflix', date: '1 Desember 2023', amount: -160000, icon: 'netflix-icon.png' },
    { id: 2, name: 'Consumption', date: '2 Desember 2023', amount: -42500, icon: 'consumption-icon.png' },
    { id: 3, name: 'Boarding house', date: '2 Desember 2023', amount: -890000, icon: 'boarding-icon.png' },
    { id: 4, name: 'Freelance Design', date: '3 Desember 2023', amount: 190000, icon: 'design-icon.png' },
    { id: 5, name: 'Maju Jaya Coffee', date: '4 Desember 2023', amount: -50000, icon: 'coffee-icon.png' },
  ];

  const sortedTransactions = transactions.sort((a, b) => {
    if (sortBy === 'amount') {
      return a.amount - b.amount;
    } else {
      return new Date(a.date) - new Date(b.date);
    }
  });

  const handleSort = (type) => {
    setSortBy(type);
  };

  const sortedAmount = transactions.sort((a,b)=>{
    if (sortBy === 'Pengeluaran'){
      return a.amount - b.amount;
    } else if (sortBy === 'Pemasukan'){
      return b.amount - a.amount;
    }else {
      return new Date(a.date) - new Date(b.date);
    }
  })

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'], 
    datasets: [
      {
        label: 'Monthly Balance',
        data: [300000, 450000, 200000, 800000, -100000, 400000, 900000], 
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
    <Container className="laporan-container ">
      <Row>
        <Col>
          <h1>Laporan Keuangan</h1>
          <div className="statistik-keuangan d-flex justify-content-center">
            <div className="chart-placeholder d-flex justify-content-center">
              <Line data={chartData} />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-3">
          <h2>Most Popular Transactions</h2>
          <Col>
          <div className="ps-5">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-type">
              Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleSort('all')}>Semua</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('pengeluaran')}>Pengeluaran</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('pendapatan')}>Pemasukan</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
          </Col>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-sort">
              Sort by
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSort('date')}>Tanggal</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSort('amount')}>Jumlah</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="transaction-list">
            {sortedTransactions.map((transaction)=> (
              <div key={transaction.id} className="transaction-item">
                <img
                  src={`/assets/icons/${transaction.icon}`}
                  alt={transaction.name}
                  className="icon-image"
                />
                <div className="transaction-info">
                  <p className="transaction-name">{transaction.name}</p>
                  <p className="transaction-date">{transaction.date}</p>
                </div>
                <div className="transaction-amount">
                  {transaction.amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
                </div>
              </div>
            ))}
            </div>
        </Col>
      </Row>
    </Container>
 </Page>
  );
}

export default LaporanKeuangan;
