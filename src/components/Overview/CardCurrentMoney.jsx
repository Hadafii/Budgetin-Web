import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const CardCurrentMoney = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found, redirecting to login.");
        window.location.href = "/Login";
        return;
      }

      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getUserBalance", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setBalance(result.balance); // Update balance state with fetched data
        } else {
          console.error("Failed to fetch balance:", result.message);
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    };

    fetchBalance();
  }, []);

  return (
    <Card className="p-4 shadow-sm rounded-4 text-white" style={{ backgroundColor: '#15B7B9' }}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <i className="bi bi-wallet2 fs-2 me-3"></i>
          <div>
            <h6 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Uang Kamu</h6>
            <p className="text-light">
              <i className="bi bi-arrow-up-right text-success"></i>
              15 % Dibanding bulan kemarin!
            </p>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <h1>Rp. {balance !== null ? balance.toLocaleString('id-ID') : 'Loading...'}</h1>
          <a href="/Laporan" style={{ color: 'white' }}>
            <i className="bi bi-arrow-right fs-4"></i>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardCurrentMoney;
