import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import directDownlogo from '../../Assets/direct-down.svg'

const CardPemasukan = () => {
  const [earning, setEarning] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState("");

  useEffect(() => {
    const fetchEarning = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getSumMonthEarning", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();


        if (result.success) {
          setEarning(result.data.totalEarning);
        } else {
          console.error("Failed to fetch spending:", result.message);
        }
      } catch (error) {
        console.error("Failed to fetch spending:", error);
      } finally {
        setLoading(false);
      }
    };

    const getCurrentMonthName = () => {
      const date = new Date();
      return date.toLocaleString("id-ID", { month: "long" });
    };

    setCurrentMonth(getCurrentMonthName());
    fetchEarning();
  }, []);

  return (
    <Card className="px-4 shadow-sm rounded-4">
      <Card.Body>
        <div className="d-flex align-items-center mb-3">
          <div className='border rounded-circle'>
            <img src={directDownlogo} className='p-1' width='50px' ></img>
          </div>
          
          <div className='ps-2'>
            <h4>Pemasukan {currentMonth}</h4>
          </div>
        </div>
        
        <hr />
        
        <div className="d-flex justify-content-between align-items-center">
          <h2>
            {loading ? "Loading..." : `Rp. ${earning ? earning.toLocaleString("id-ID") : "0"}`}
          </h2>
          <a href="/Pendapatan" style={{ color: '#1B1B1B' }}>
            <i className="bi bi-arrow-right fs-4"></i>
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CardPemasukan;
