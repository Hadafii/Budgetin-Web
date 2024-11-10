import React from 'react';
import '../Component Style/FinancialReport.css';

const FinancialReport = () => {
  return (
    <div className="financial-report">
      <h3>Laporan Keuangan</h3>
      <div className="chart">
        <img
          src="https://storage.googleapis.com/a1aa/image/rujr8Fu7IiolEVBGfPZh9QRmY16sGur5QFFHrJbzNDQpapzJA.jpg"
          alt="Financial Report Chart"
          width="600"
          height="300"
        />
      </div>
    </div>
  );
};

export default FinancialReport;
