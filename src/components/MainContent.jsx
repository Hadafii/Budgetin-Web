import React from 'react';
import Header from './Header';
import OverviewCard from './OverviewCard';
import FinancialReport from './FinancialReport';
import '../Component Style/MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <Header />
      <div className="overview">
        <OverviewCard title="Uang Kamu" amount="Rp. 9.982.299.000" icon="fa-wallet" iconColor="green" />
        <OverviewCard title="Pengeluaran" amount="Rp. 3.210.000" icon="fa-exclamation-triangle" iconColor="yellow" />
        <OverviewCard title="Pemasukan" amount="Rp. 33.477.200" icon="fa-arrow-up" iconColor="blue" />
      </div>
      <FinancialReport />
    </div>
  );
};

export default MainContent;
