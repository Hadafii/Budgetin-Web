import React, { useState, useEffect } from "react";
import { Card, Button, FloatingLabel, Form, Alert, Row, Col, Spinner } from "react-bootstrap";

function DetailBudgetCard({ token, budgetId, monthlyBudget, refreshParent }) {
  const [budgetDetails, setBudgetDetails] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [detailForms, setDetailForms] = useState([]); 
  const [originalDetailForms, setOriginalDetailForms] = useState([]); 
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isInvalidForm, setIsInvalidForm] = useState(false); 

  const refreshDetails = () => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getCategories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (response.ok) {
          setCategories(result.data);
        } else {
          setError(result.message || "Failed to fetch categories");
        }
      } catch (err) {
        setError("Error connecting to the server");
      }
    };

    const fetchBudgetDetails = async () => {
      try {
        const response = await fetch(
          `https://api.dafiutomo.com/GatewayApi/v1/budgetDetails/${budgetId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const result = await response.json();

        if (response.ok) {
          setBudgetDetails(result.data);
          const mappedDetails = result.data.map((detail) => ({
            id: detail.detail_id,
            category_id: detail.category_id,
            category_budget: detail.category_budget,
          }));
          setDetailForms(mappedDetails); 
          setOriginalDetailForms(mappedDetails); 
        } else {
          setError(result.message || "Failed to fetch budget details");
        }
      } catch (err) {
        setError("Error connecting to the server");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchBudgetDetails();
  };

  useEffect(() => {
    refreshDetails();
  }, [budgetId]);

  const handleAddDetailForm = () => {
    setDetailForms([
      ...detailForms,
      { id: `new-${detailForms.length + 1}`, category_id: "", category_budget: "" },
    ]);
  };

  const handleRemoveDetailForm = (id) => {
    setDetailForms(detailForms.filter((form) => form.id !== id));
  };

  const handleSaveDetails = async () => {
    const totalBudget = detailForms.reduce((acc, form) => acc + parseFloat(form.category_budget || 0), 0);

    if (totalBudget > monthlyBudget) {
      setIsInvalidForm(true);
      setError(`Total budget (${totalBudget}) exceeds monthly budget (${monthlyBudget})`);
      return;
    } else {
      setIsInvalidForm(false); 
    }

    if (detailForms.length === 0) {
      setError("Please add at least one detail before saving");
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch(
        "https://api.dafiutomo.com/GatewayApi/v1/replaceBudgetDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            budget_id: budgetId,
            details: detailForms.map(({ category_id, category_budget }) => ({
              category_id,
              category_budget: parseFloat(category_budget),
            })),
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Details updated successfully!");
        setIsEditing(false); 
        refreshDetails();
        refreshParent(); 
      } else {
        setError(result.message || "Failed to update budget details");
      }
    } catch (err) {
      setError("Error saving details");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setDetailForms(originalDetailForms);
    setIsEditing(false);
    setError("");
    setSuccessMessage("");
    setIsInvalidForm(false); 
  };

  return (
    <Card className="mt-4">
      <Card.Body>
        <Card.Title>Detail Budget</Card.Title>
        {isLoading ? (
            <div className="text-center">
            <Spinner animation="border" variant="primary" role="status" />
            <div className="mt-2">Loading...</div>
            </div>
        ) : (
            <>
            {budgetDetails.length === 0 && !isEditing ? (
                <>
                <Alert variant="info">
                    No budget details found. Start by adding your budget details!
                </Alert>
                <Button variant="primary" onClick={() => setIsEditing(true)}>
                    Add New Details
                </Button>
                </>
            ) : (
                <>
                {detailForms.map((form) => (
                    <Row key={form.id} className="mb-3">
                    <Col>
                        <FloatingLabel controlId={`floatingSelect-${form.id}`} label="Category">
                        <Form.Select
                          value={form.category_id}
                          disabled={!isEditing}
                          isInvalid={form.isInvalidCategory}
                          onChange={(e) =>
                            setDetailForms((prev) =>
                              prev.map((f) =>
                                f.id === form.id ? { ...f, category_id: e.target.value, isInvalidCategory: false } : f
                              )
                            )
                          }
                        >
                          <option value="" disabled>
                            Select Category
                          </option>
                          {categories.map((cat) => (
                            <option
                              key={cat.category_id}
                              value={cat.category_id}
                              disabled={
                                !isEditing || // Nonaktifkan jika bukan mode edit
                                budgetDetails.some((detail) => detail.category_id === cat.category_id) // Nonaktifkan jika kategori sudah dipakai
                              }
                            >
                              {cat.category_name}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          {form.category_id === ""
                            ? "Please select a category."
                            : "This category is already selected."}
                        </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    <Col>
                        <FloatingLabel controlId={`floatingInput-${form.id}`} label="Category Budget">
                        <Form.Control
                            type="number"
                            placeholder="Budget"
                            value={form.category_budget}
                            disabled={!isEditing} 
                            isInvalid={isInvalidForm}
                            onChange={(e) =>
                            setDetailForms((prev) =>
                                prev.map((f) =>
                                f.id === form.id ? { ...f, category_budget: e.target.value } : f
                                )
                            )
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            Total exceeds monthly budget
                        </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                    {isEditing && (
                        <Col>
                        <Button
                            variant="danger"
                            onClick={() => handleRemoveDetailForm(form.id)}
                        >
                            Remove
                        </Button>
                        </Col>
                    )}
                    </Row>
                ))}
                {!isEditing && detailForms.length > 0 && (
                    <Button variant="warning" className="mb-3" onClick={() => setIsEditing(true)}>
                    Edit Details
                    </Button>
                )}
                {isEditing ? (
                    <>
                    <Button variant="primary" onClick={handleAddDetailForm}>
                        Add Budget Detail
                    </Button>
                    <Button
                        variant="success"
                        className="ms-2"
                        onClick={handleSaveDetails}
                        disabled={isSaving}
                    >
                        {isSaving ? (
                        <>
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                            <span className="ms-2">Saving...</span>
                        </>
                        ) : (
                        "Save Details"
                        )}
                    </Button>
                    <Button
                        variant="secondary"
                        className="ms-2"
                        onClick={handleCancelEdit}
                    >
                        Cancel
                    </Button>
                    </>
                ) : null}
                </>
            )}
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {successMessage && <Alert variant="success" className="mt-3">{successMessage}</Alert>}
            </>
        )}
        </Card.Body>
    </Card>
  );
}

export default DetailBudgetCard;
