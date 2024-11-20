import React, { useState, useEffect } from "react";
import { Card, Row, Col, Spinner, Alert, ProgressBar } from "react-bootstrap";

function AllBudgetStatusCard({ token }) {
  const [budgetStatus, setBudgetStatus] = useState([]);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };

  const fetchBudgetStatus = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getAllBudgetStatus", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setBudgetStatus(result.data.details);
        setTotalBudget(result.data.totalBudget);
        setTotalSpent(result.data.totalSpent);
        setTotalPercentage(result.data.totalPercentage);
      } else {
        setError(result.message || "Failed to fetch budget status");
      }
    } catch (err) {
      setError("Error connecting to the server");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgetStatus();
  }, [token]);

  const getProgressBarVariant = (percentage) => {
    if (percentage <= 10) return "info";
    if (percentage <= 25) return "success";
    if (percentage <= 50) return "primary";
    if (percentage <= 75) return "warning";
    return "danger";
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Budget Progress</Card.Title>
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" role="status" />
            <div className="mt-2">Loading...</div>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Alert variant="info">
              <strong>Total Budget: </strong>{formatRupiah(totalBudget)} |{" "}
              <strong>Total Spent: </strong>{formatRupiah(totalSpent)} |{" "}
              <strong>Usage:</strong> {totalPercentage}%
            </Alert>
            <ProgressBar
              now={totalPercentage}
              variant={getProgressBarVariant(totalPercentage)}
              striped
              animated
              label={`${totalPercentage}%`}
              className="mb-4"
            />
            <hr /> 
            {budgetStatus.map((item, index) => (
              <div key={index} className="mb-3">
                <Row>
                  <Col>
                    <strong>{item.category}</strong>
                  </Col>
                  <Col className="text-end"><strong>{formatRupiah(item.amountSpent)}</strong>
                     / {formatRupiah(item.budgetAmount)} (
                    {item.percentage}%)
                  </Col>
                </Row>
                <ProgressBar
                  now={item.percentage}
                  variant={getProgressBarVariant(item.percentage)}
                  striped
                  animated
                  label={`${item.percentage}%`}
                />
              </div>
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default AllBudgetStatusCard;
