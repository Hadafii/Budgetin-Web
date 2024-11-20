// CardSisaBudget.jsx
import React, { useEffect, useState } from 'react';
import { Card, ProgressBar, Row, Col } from 'react-bootstrap';

const BudgetCard = () => {
  const [budgets, setBudgets] = useState([]);
  
  useEffect(() => {
    const fetchBudgetData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getBudgetStatus", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setBudgets(result.data);
        } else {
          console.error("Failed to fetch budget data:", result.message);
        }
      } catch (error) {
        console.error("Error fetching budget data:", error);
      }
    };

    fetchBudgetData();
  }, []);

  const getProgressColor = (percentage) => {
    if (percentage > 75) return '#FFA091';
    if (percentage >= 50) return '#F9BA33';
    return '#56C2B3';
  };

  const formatCurrency = (amount) => {
    return amount ? amount.toLocaleString('id-ID') : '0';
  };

  return (
    <Card className="shadow p-3 pb-4 border-0 rounded-4 flex-fill" style={{ minWidth: '350px'  }}>
      <Card.Body>
        <Row className="mb-4">
          <Col>
            <Card.Title className="fs-5"><strong>Sisa Budget</strong></Card.Title>
          </Col>
          <Col className="text-end">
            <a href="/Rencana" className="budgetin-linked">Lihat Semua</a>
          </Col>
        </Row>
        <hr/>
        {budgets.map((budget, index) => (
          <div key={index} className="mb-4">
            <Row>
              <Col xs={9} className="py-2" style={{ fontSize: '1.3em' }}>{budget.category}</Col>
              <Col xs={3} className="text-end text-muted">Target: {budget.date}</Col>
            </Row>
            <Row>
              <Col xs={9}>
                <h5>
                  Rp. {formatCurrency(budget.amountSpent)}{' '}
                  <span style={{ fontSize: '0.7em', color: '#6c757d' }}>/Rp. {formatCurrency(budget.budgetAmount)}</span>
                </h5>
              </Col>
              <Col xs={3} className="text-end" style={{ color: getProgressColor(budget.percentage) }}>
                <h5>{budget.percentage}%</h5>
              </Col>
            </Row>
            <ProgressBar now={budget.percentage} variant="custom" style={{ backgroundColor: '#e9ecef', height: '8px' }}>
              <ProgressBar
                now={budget.percentage}
                style={{ backgroundColor: getProgressColor(budget.percentage), height: '8px' }}
              />
            </ProgressBar>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default BudgetCard;
