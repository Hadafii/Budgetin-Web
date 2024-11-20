import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Card, Form, FloatingLabel, Button, Modal } from "react-bootstrap";

function ResetPassword() {
    const [searchParams] = useSearchParams();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setModalMessage("Token reset password tidak valid.");
            setIsSuccess(false);
            setShowModal(true);
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError("");
        setIsLoading(true); 

        if (newPassword !== confirmPassword) {
            setPasswordError("Password baru dan konfirmasi password tidak cocok.");
            setIsLoading(false); 
            return;
        }

        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const result = await response.json();

            if (result.success) {
                setIsSuccess(true);
                setModalMessage("Password berhasil direset. Silakan login dengan password baru Anda.");
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            } else {
                setIsSuccess(false);
                setModalMessage(result.message || "Gagal mereset password.");
            }
        } catch (error) {
            console.error("Error during password reset:", error);
            setIsSuccess(false);
            setModalMessage("Terjadi kesalahan. Silakan coba lagi.");
        }

        setIsLoading(false); 
        setShowModal(true);
    };

    return (
        <Container className="py-5">
            <Card className="shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
                <Card.Body>
                    <h4 className="text-center">Reset Kata Sandi</h4>
                    <p className="text-muted text-center">Masukkan password baru Anda di bawah ini.</p>

                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel label="Password Baru" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Password Baru"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                isInvalid={!!passwordError}
                            />
                        </FloatingLabel>

                        <FloatingLabel label="Konfirmasi Password Baru" className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Konfirmasi Password Baru"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                isInvalid={!!passwordError}
                            />
                            <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
                        </FloatingLabel>

                        <Button type="submit" className="w-100 btn-custom-login" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm text-white me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Mengatur Ulang...
                                </>
                            ) : (
                                "Reset Password"
                            )}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{isSuccess ? "Berhasil" : "Gagal"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button className="button-edit-profile" onClick={() => setShowModal(false)}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ResetPassword;
