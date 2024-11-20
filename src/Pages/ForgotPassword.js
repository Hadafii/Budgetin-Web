import { useState } from "react";
import { Container, Card, Form, FloatingLabel, Button, Row, Col, Modal } from "react-bootstrap";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setIsLoading(true); 

        if (!email) {
            setEmailError("Email tidak boleh kosong.");
            setIsLoading(false); 
            return;
        }

        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/forgotPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setModalMessage("Link untuk reset kata sandi telah dikirim ke email Anda.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            } else {
                setIsSuccess(false);
                setModalMessage(result.message || "Gagal mengirim email reset kata sandi.");
            }
        } catch (error) {
            console.error("Error during forgot password request:", error);
            setIsSuccess(false);
            setModalMessage("Terjadi kesalahan. Silakan coba lagi.");
        }

        setIsLoading(false); 
        setShowModal(true);
    };

    return (
        <Container className="py-5">
            <div className="p-3">
                <h2 className="text-center">Lupa Kata Sandi</h2>
                <hr />
            </div>

            <Card className="shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <Card.Body>
                    <Row>
                        <Col>
                            <h4>Reset Kata Sandi Anda</h4>
                            <p className="text-muted pb-3">
                                Masukkan alamat email Anda untuk menerima tautan reset kata sandi.
                            </p>
                            <Form onSubmit={handleSubmit}>
                                <FloatingLabel label="Alamat Email" className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Masukkan email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        isInvalid={!!emailError}
                                    />
                                    <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
                                </FloatingLabel>
                                <Button type="submit" className="w-100 btn-custom-login" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm text-white me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Mengirim...
                                        </>
                                    ) : (
                                        "Kirim Link Reset"
                                    )}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSuccess ? "Berhasil" : "Gagal"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{modalMessage}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-custom-login" onClick={() => setShowModal(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ForgotPassword;
