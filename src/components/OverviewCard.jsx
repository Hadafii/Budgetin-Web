// OverviewCard.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import CardCurrentMoney from './Overview/CardCurrentMoney';
import CardPengeluaran from './Overview/CardPengeluaran';
import CardPemasukan from './Overview/CardPemasukan';
import '../Component Style/OverviewCard.css';

const OverviewCard = () => {
  return (
    <div className="overview-container rounded-4 p-3 shadow">
      <h2>Overview</h2>
      <div className="row g-3">
        <div className="col-12">
          <CardCurrentMoney />
        </div>
        <div className="col-12 col-md-6">
          <CardPengeluaran />
        </div>
        <div className="col-12 col-md-6">
          <CardPemasukan />
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
