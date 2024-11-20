import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import EmptyWallet from '../../Assets/empty-wallet.svg'

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
          setBalance(result.balance); 
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
    <Card className="px-4 shadow-sm rounded-4 text-white" style={{ backgroundColor: '#15B7B9' }}>
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
        <div className='border rounded-circle'>
            <img src={EmptyWallet} className='p-1' width='50px' ></img>
          </div>
          <div className='ps-2'>
            <h4 >Uang Kamu</h4>
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
