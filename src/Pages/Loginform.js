import { useState } from "react";
import { Container, FloatingLabel, Form, Button, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Loginform.css";

function Loginform({ onLoginSuccess }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        let hasError = false;
        if (!username) {
            setError("Please input your username.");
            setIsUsernameInvalid(true);
            hasError = true;
        }
        if (!password) {
            setError("Please input your password.");
            setIsPasswordInvalid(true);
            hasError = true;
        }
        if (hasError) return;

        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/loginUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const result = await response.json();

            if (result.success) {
                localStorage.setItem("token", result.token);
                onLoginSuccess();
                window.location.href = "/Dashboard";
            } else {
                setError("Invalid username or password");
                setIsUsernameInvalid(true);
                setIsPasswordInvalid(true);
                setValidated(false);
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError("An error occurred. Please try again later.");
            setIsUsernameInvalid(true);
            setIsPasswordInvalid(true);
            setValidated(false);
        }
    };

    return (
        <Container className="login-container d-flex justify-content-center align-items-center">
            <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form text-center">
                <h1><b>Halo!</b></h1>
                <p>Sign in ke akun Budgetin mu!</p>

                <FloatingLabel controlId="formBasicUsername" label="Username " className="mb-3 iniformlogin">
                    <Form.Control
                        type="text"
                        className="isiformlogin"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUsernameInvalid(false); 
                        }}
                        required
                        isInvalid={isUsernameInvalid}
                    />
                </FloatingLabel>

                <InputGroup className="mb-3">
                    <FloatingLabel controlId="formBasicPassword" label="Password" className="iniformlogin w-100">
                        <Form.Control
                            type={showPassword ? "text" : "password"} 
                            className="isiformlogin isiformlogin-password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setIsPasswordInvalid(false); 
                            }}
                            required
                            autoComplete="current-password"
                            isInvalid={isPasswordInvalid}
                        />
                        <Button
                        variant="outline-secondary"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)} 
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            zIndex: "5",
                            border: "none",
                            backgroundColor: "transparent",
                        }}
                    >
                        <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                    </Button>
                    </FloatingLabel>
                    
                </InputGroup>

                {error && (
                    <>
                        <p className="text-danger">{error}</p>
                        <p className="text-center mt-2">
                            Forgot your password?{" "}
                            <Link to="/forgot-password" className="sigin-link">
                                Click here
                            </Link>
                        </p>
                    </>
                )}

                <Button type="submit" className="btn-custom-budegetin-1 w-100">
                    Log In
                </Button>

                <p className="mt-3">
                    Belum memiliki akun?{" "}
                    <Link to="/signin" className="sigin-link">
                        Sign up disini!
                    </Link>
                </p>
            </Form>
        </Container>
    );
}

export default Loginform;
