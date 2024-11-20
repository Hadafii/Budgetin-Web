import React, { useState, useEffect } from "react";
import { Card, Button, Form, FloatingLabel, Alert, Container, Spinner, Row, Col } from "react-bootstrap";
import DetailBudgetCard from "./DetailBudgetCard";
import AllBudgetStatusCard from "./AllBudgetStatusCard"; 

function MonthlyBudgetCard({ token }) {
  const [totalBudget, setTotalBudget] = useState("");
  const [originalBudget, setOriginalBudget] = useState(""); 
  const [budgetExists, setBudgetExists] = useState(false);
  const [budgetId, setBudgetId] = useState(null);
  const [totalDetailsBudget, setTotalDetailsBudget] = useState(0); 
  const [userBalance, setUserBalance] = useState(0); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  const [isAdding, setIsAdding] = useState(false); 
  const [isConfirming, setIsConfirming] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false); 

  const fetchUserBalance = async () => {
    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getUserBalance", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setUserBalance(result.balance); 
      } else {
        setError(result.message || "Failed to fetch user balance");
      }
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  const refreshCard = () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    setTotalBudget("");
    setOriginalBudget("");
    setBudgetExists(false);
    setTotalDetailsBudget(0);
    setUserBalance(0);
    setIsEditing(false);
    setIsAdding(false);
    setIsConfirming(false);
    setIsDeleting(false);

    const checkMonthlyBudget = async () => {
      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/checkMonthlyBudget", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          if (result.exists) {
            setBudgetExists(true);
            setTotalBudget(result.data.total_budget); 
            setOriginalBudget(result.data.total_budget); 
            setBudgetId(result.data.budget_id);

            const detailsResponse = await fetch(
              `https://api.dafiutomo.com/GatewayApi/v1/budgetDetails/${result.data.budget_id}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            const detailsResult = await detailsResponse.json();
            if (detailsResponse.ok) {
              const total = detailsResult.data.reduce((sum, detail) => sum + parseFloat(detail.category_budget || 0), 0);
              setTotalDetailsBudget(total);
            } else {
              setError(detailsResult.message || "Failed to fetch budget details");
            }
          } else {
            setBudgetExists(false);
          }
        } else {
          setError(result.message || "Failed to fetch budget data");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBalance()
    checkMonthlyBudget();
  };

  useEffect(() => {
    refreshCard();
  }, [token]);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsAdding(true);

    if (!totalBudget || totalBudget <= 0) {
      setError("Please enter a valid budget greater than 0");
      setIsAdding(false);
      return;
    }
    if (totalBudget > userBalance) {
      setError(`Budget cannot exceed your current balance of Rp ${userBalance}`);
      setIsAdding(false);
      return;
    }

    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/addMonthlyBudget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ total_budget: totalBudget }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Monthly budget added successfully!");
        setTimeout(() => {
          refreshCard(); 
        }, 2000);
      } else {
        setError(result.message || "Failed to add budget");
        setIsAdding(false);
      }
    } catch (err) {
      setError("Error connecting to the server");
      setIsAdding(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };
  

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTotalBudget(originalBudget); 
    setError("");
    setSuccessMessage("");
  };

  const handleConfirmEdit = async () => {
    setError("");
    setSuccessMessage("");
    setIsConfirming(true);

    if (!totalBudget || totalBudget <= 0) {
      setError("Please enter a valid budget greater than 0");
      setIsConfirming(false);
      return;
    }

    if (totalBudget < totalDetailsBudget) {
      setError(
        `Total monthly budget (Rp ${totalBudget}) cannot be less than the sum of budget details (Rp ${totalDetailsBudget}).`
      );
      setIsConfirming(false);
      return;
    }

    if (totalBudget > userBalance) {
      setError(`Budget cannot exceed your current balance of Rp ${userBalance}`);
      setIsConfirming(false);
      return;
    }

    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/updateMonthlyBudget", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ total_budget: totalBudget }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Budget updated successfully!");

        setTimeout(() => {
          setIsConfirming(false); 
          refreshCard(); 
        }, 2000);
      } else {
        setError(result.message || "Failed to update budget");
        setIsConfirming(false);
      }
    } catch (err) {
      setError("Error connecting to the server");
      setIsConfirming(false);
    }
  };

  const handleDeleteBudget = async () => {
    setError("");
    setSuccessMessage("");
    setIsDeleting(true);

    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/deleteMonthlyBudget", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Monthly budget deleted successfully!");
        setTimeout(() => {
          refreshCard(); 
        }, 2000);
      } else {
        setError(result.message || "Failed to delete budget");
        setIsDeleting(false);
      }
    } catch (err) {
      setError("Error connecting to the server");
      setIsDeleting(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Set Your Monthly Budget</Card.Title>
          {isLoading ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" role="status" />
              <div className="mt-2">Loading...</div>
            </div>
          ) : (
            <>
              {budgetExists ? (
                <>
                  <Alert variant="info">
                    Budget for this month: <strong>{formatRupiah(originalBudget)}</strong>
                  </Alert>
                  <Alert variant="secondary">
                    Total Budget Details: <strong>{formatRupiah(totalDetailsBudget)}</strong>
                  </Alert>
                  <Form>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Total Budget"
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Enter your total budget"
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(e.target.value)}
                        isInvalid={totalBudget < totalDetailsBudget}
                        disabled={!isEditing}
                      />
                      <Form.Control.Feedback type="invalid">
                        Monthly budget cannot be less than total details.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    <Row className="mt-3">
                      <Col>
                        {!isEditing ? (
                          <Button variant="warning" onClick={handleEdit}>
                            Edit Budget
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="success"
                              onClick={handleConfirmEdit}
                              className="me-2"
                              disabled={isConfirming || isDeleting}
                            >
                              {isConfirming ? (
                                <>
                                  <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    className="me-2"
                                  />
                                  Confirming...
                                </>
                              ) : (
                                "Confirm"
                              )}
                            </Button>
                            <Button
                              variant="secondary"
                              onClick={handleCancelEdit}
                              disabled={isConfirming || isDeleting}
                            >
                              Cancel
                            </Button>
                          </>
                        )}
                      </Col>
                      {isEditing && (
                        <Col className="text-end">
                          <Button
                            variant="dark"
                            onClick={handleDeleteBudget}
                            disabled={isConfirming || isDeleting}
                          >
                            {isDeleting ? (
                              <>
                                <Spinner
                                  as="span"
                                  animation="border"
                                  size="sm"
                                  role="status"
                                  className="me-2"
                                />
                                Deleting...
                              </>
                            ) : (
                              "Delete Budget"
                            )}
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Form>
                </>
              ) : (
                <Form onSubmit={handleAddBudget}>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Total Budget"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Enter your total budget"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(e.target.value)}
                      isInvalid={!!error}
                    />
                    <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
                  </FloatingLabel>
                  {successMessage && <Alert variant="success">{successMessage}</Alert>}
                  <Button variant="primary" type="submit" disabled={isAdding}>
                    {isAdding ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" />
                        <span className="ms-2">Adding...</span>
                      </>
                    ) : (
                      "Add Budget"
                    )}
                  </Button>
                </Form>
              )}
            </>
          )}
        </Card.Body>
      </Card>
      {budgetExists && budgetId && (
        <DetailBudgetCard
          token={token}
          budgetId={budgetId}
          monthlyBudget={originalBudget}
          refreshParent={refreshCard}
        />
      )}
      {budgetExists && budgetId && (
        <AllBudgetStatusCard token={token} />
      )}
    </Container>
  );
}

export default MonthlyBudgetCard;
