import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function OTPVerification({ onLoginSuccess }) {
    const location = useLocation();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertVariant, setAlertVariant] = useState("");
    const [isChangingEmail, setIsChangingEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailFromQuery = queryParams.get("email");
        if (emailFromQuery) {
            setEmail(emailFromQuery);
        }
    }, [location]);

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/verifyEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
    
            const data = await response.json();
            if (data.success) {
                setAlertMessage("Email verified successfully!");
                setAlertVariant("success");

                localStorage.setItem("token", data.token);
                onLoginSuccess();
    
                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1500);
            } else {
                setAlertMessage(data.message || "Verification failed!");
                setAlertVariant("danger");
            }
        } catch (error) {
            setAlertMessage("An error occurred. Please try again.");
            setAlertVariant("danger");
        }
    
        setIsLoading(false);
    };
    

    const handleResendOTP = async () => {
        setIsLoading(true);
        setAlertMessage("");
        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/resendOTP", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
    
            const data = await response.json();
            if (data.success) {
                setAlertMessage("OTP has been resent to your email.");
                setAlertVariant("success");
            } else {
                setAlertMessage(data.message || "Failed to resend OTP.");
                setAlertVariant("danger");
            }
        } catch (error) {
            setAlertMessage("An error occurred while resending OTP.");
            setAlertVariant("danger");
        }
    
        setIsLoading(false);
    };

    const handleChangeEmail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/changeEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldEmail: email, newEmail: e.target.newEmail.value.trim() }),
            });
    
            const data = await response.json();
            if (data.success) {
                setEmail(e.target.newEmail.value.trim());
                setAlertMessage("Email updated successfully. OTP sent to new email.");
                setAlertVariant("success");
                setIsChangingEmail(false);
            } else {
                setAlertMessage(data.message || "Failed to update email.");
                setAlertVariant("danger");
            }
        } catch (error) {
            setAlertMessage("An error occurred while updating email.");
            setAlertVariant("danger");
        }
    
        setIsLoading(false);
    };
    

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="otp-verification p-4 bg-light shadow rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Verify Your Email</h2>

        {alertMessage && (
          <Alert variant={alertVariant} className="text-center">
            {alertMessage}
          </Alert>
        )}

        {!isChangingEmail ? (
          <>
            <Form onSubmit={handleVerifyOTP}>
              <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </FloatingLabel>

              <FloatingLabel controlId="formOTP" label="Enter OTP" className="mb-3">
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  required
                />
              </FloatingLabel>

              <Button type="submit" variant="primary" className="verfif-otp w-100" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify OTP"}
              </Button>
            </Form>

            <div className="mt-3 text-center">
              <Button
                variant="link"
                onClick={handleResendOTP}
                disabled={isLoading}
                style={{ textDecoration: "none" }}
                className="budgetin-button-link"
              >
                {isLoading ? "Resending..." : "Resend OTP"}
              </Button>
              <br />
              <Button
                variant="link"
                onClick={() => setIsChangingEmail(true)}
                style={{ textDecoration: "none" }}
                className="budgetin-button-link"
              >
                Change Email
              </Button>
            </div>
          </>
        ) : (
            <Form onSubmit={handleChangeEmail}>
            <FloatingLabel controlId="formNewEmail" label="New Email" className="mb-3">
                <Form.Control
                    type="email"
                    name="newEmail"
                    placeholder="Enter new email"
                    required
                />
            </FloatingLabel>
            <Button type="submit" variant="primary" className="verfif-otp w-100" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span
                            className="spinner-border spinner-border-sm text-white me-2"
                            role="status"
                            aria-hidden="true"
                        ></span>
                        Verifying...
                    </>
                ) : (
                    "Verify OTP"
                )}
            </Button>
            <div className="mt-3 text-center">
                <Button
                    variant="link"
                    onClick={() => setIsChangingEmail(false)}
                    style={{ textDecoration: "none" }}
                >
                    Cancel
                </Button>
            </div>
        </Form>        
        )}
      </div>
    </Container>
  );
}

export default OTPVerification;
