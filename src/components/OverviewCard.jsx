// OverviewCard.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardCurrentMoney from './Overview/CardCurrentMoney';
import CardPengeluaran from './Overview/CardPengeluaran';
import CardPemasukan from './Overview/CardPemasukan';
import '../Component Style/OverviewCard.css';

const OverviewCard = () => {
  return (
    <div className="overview-container rounded-5 p-4 shadow">
      <h2>Overview</h2>
      <Row className="g-3">
        <Col xs={12}>
          <CardCurrentMoney />
        </Col>
        <Col xs={12} md={6}>
          <CardPengeluaran />
        </Col>
        <Col xs={12} md={6}>
          <CardPemasukan />
        </Col>
      </Row>
    </div>
  );
};

export default OverviewCard;
