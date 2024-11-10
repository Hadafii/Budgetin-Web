import { useState } from "react";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../style/Loginform.css";

function Loginform() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
                console.log("Token saved:", result.token);
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
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Form noValidate validated={validated} onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
                <h1><b>Hello</b></h1>
                <p>Sign in to your Budgetin account</p>

                <FloatingLabel controlId="formBasicUsername" label="Username " className="mb-3 iniformlogin">
                    <Form.Control
                        type="text"
                        className="isiformlogin"
                        placeholder="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsUsernameInvalid(false); // Reset error saat mengubah input
                        }}
                        required
                        isInvalid={isUsernameInvalid}
                    />
                </FloatingLabel>

                <FloatingLabel controlId="formBasicPassword" label="Password" className="mb-3 iniformlogin">
                    <Form.Control
                        type="password"
                        className="isiformlogin"
                        placeholder="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setIsPasswordInvalid(false); // Reset error saat mengubah input
                        }}
                        required
                        autoComplete="current-password"
                        isInvalid={isPasswordInvalid}
                    />
                </FloatingLabel>

                {/* Pesan error umum hanya di atas tombol login */}
                {error && <p className="text-danger">{error}</p>}
                
                
                <Button type="submit" className="btn-custom-login w-100">
                    Log In
                </Button>

                <p className="mt-3">
                    Don't have an account? <Link to="/signin" className="sigin-link">Sign up</Link>
                </p>
            </Form>
        </Container>
    );
}

export default Loginform;
