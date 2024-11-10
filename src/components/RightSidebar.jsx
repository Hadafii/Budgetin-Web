import React from 'react';
import '../Component Style/RightSidebar.css';

const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      <div className="income-section">
        <h3>Pemasukan</h3>
        <div className="income-item">
          <div className="income-details">
            <h4>Pekerjaan</h4>
            <p>Target: August 25 2022</p>
          </div>
          <div className="income-value">
            <p>Rp. 32jt / Rp. 32jt</p>
            <p>100%</p>
            <div className="progress-bar purple">
              <div className="progress-fill" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
        <div className="income-item">
          <div className="income-details">
            <h4>Investasi</h4>
            <p>Target: August 25 2022</p>
          </div>
          <div className="income-value">
            <p>Rp. 6jt / Rp. 8jt</p>
            <p>79%</p>
            <div className="progress-bar yellow">
              <div className="progress-fill" style={{ width: '79%' }}></div>
            </div>
          </div>
        </div>
        <div className="income-item">
          <div className="income-details">
            <h4>Bisnis</h4>
            <p>Target: August 25 2022</p>
          </div>
          <div className="income-value">
            <p>Rp. 18jt / Rp. 100jt</p>
            <p>32%</p>
            <div className="progress-bar green">
              <div className="progress-fill" style={{ width: '32%' }}></div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="transaction-section">
        <h3>Transaksi Terbaru</h3>
        <div className="transaction-item">
          <div className="transaction-details">
            <div className="transaction-logo"></div>
            <p>Indomaret</p>
            <p>August 20, 2022</p>
          </div>
          <div className="transaction-value">
            <p>Rp. 210rb</p>
            <p className="status completed">Completed</p>
          </div>
        </div>
        <div className="transaction-item">
          <div className="transaction-details">
            <div className="transaction-logo"></div>
            <p>Hello Summer</p>
            <p>August 20, 2022</p>
          </div>
          <div className="transaction-value">
            <p>Rp. 540rb</p>
            <p className="status completed">Completed</p>
          </div>
        </div>
        <div className="transaction-item">
          <div className="transaction-details">
            <div className="transaction-logo"></div>
            <p>Parkiran Hotel</p>
            <p>August 20, 2022</p>
          </div>
          <div className="transaction-value">
            <p>Rp. 20rb</p>
            <p className="status completed">Completed</p>
          </div>
        </div>
        <div className="transaction-item">
          <div className="transaction-details">
            <div className="transaction-logo"></div>
            <p>Dinner</p>
            <p>August 20, 2022</p>
          </div>
          <div className="transaction-value">
            <p>Rp. 3jt</p>
            <p className="status completed">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
