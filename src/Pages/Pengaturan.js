import React, { useState } from 'react';
import { Row, Col, Button, Modal, Form, FloatingLabel, InputGroup, Spinner, Alert } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Page from '../components/Page';
import '../style/Pengaturan.css';

function Settings({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    // Reset semua state terkait form
    setCurrentPassword("");
    setFeedbackMessage("");
    setIsInvalidPassword(false);
    setShowCurrentPassword(false);
    setShowAlert(false);

    // Tutup modal
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const togglePasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      setFeedbackMessage("Kata sandi harus diisi!");
      setIsInvalidPassword(true);
      return;
    }

    setIsDeleting(true);
    setFeedbackMessage("");
    setIsInvalidPassword(false);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/deleteAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ password: currentPassword }),
      });

      const result = await response.json();

      if (result.success) {
        setAlertMessage("Akun Anda berhasil dihapus. Semua data telah dihapus dari sistem kami.");
        setShowAlert(true);

        setTimeout(() => {
          localStorage.clear(); 
          window.location.href = "/"; 
        }, 2000); 
      } else {
        setFeedbackMessage(result.message || "Gagal menghapus akun.");
        setIsInvalidPassword(true);
      }
    } catch (error) {
      setFeedbackMessage("Terjadi kesalahan saat menghapus akun.");
      console.error("Error deleting account:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >

        <div className="container mt-4">
          <h2>Pengaturan</h2>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Informasi Aplikasi</Accordion.Header>
              <Accordion.Body>
                <div>
                  <p className="text-dark"><b>Panduan Penggunaan:</b> Dapatkan tutorial lengkap tentang penggunaan aplikasi ini.</p>
                  <p className="text-dark"><b>Kebijakan Privasi & Syarat Layanan:</b> Ketahui lebih lanjut mengenai kebijakan privasi dan persyaratan penggunaan.</p>
                  <p className="text-dark"><b>Versi Aplikasi:</b> 1.0.0</p>
                </div>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>Melihat dan Mengubah Profile</Accordion.Header>
              <Accordion.Body>
                <p>Pengguna dapat melihat dan mengubah isi-isi profil nya sesuai dengan ketentuan yang ada. Pengguna dapat menemukan laman Profil dengan klik Profil pada <i>Navigation Bar.</i> atau dengan klik button dibawah ini.</p>
                <Button className='button-delete-account' href='/Profile'>Masuk Ke Profile</Button>
              </Accordion.Body>
            </Accordion.Item> 

            <Accordion.Item eventKey="3">
              <Accordion.Header>Bahasa dan Mata Uang</Accordion.Header>
              <Accordion.Body>
                <p>Budgetin menggunakan Bahasa Indonesia dan mata uang Rupiah sebagai standar.</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className='mt-3 mx-2'>
          <Button variant="danger" onClick={handleShow}>
            Hapus Akun Anda
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Anda Yakin Ingin Menghapus Akun?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Semua history dan data dari akun akan dihapus. Anda tidak dapat login lagi!</p>
            
            {showAlert && (
              <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
                {alertMessage}
              </Alert>
            )}

            <Form>
              <InputGroup className="mb-3">
                <FloatingLabel label="Kata Sandi" className="flex-grow-1">
                  <Form.Control
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan kata sandi Anda"
                    isInvalid={isInvalidPassword} 
                  />
                  <Form.Control.Feedback type="invalid">
                    {feedbackMessage || "Password salah. Silakan coba lagi."}
                  </Form.Control.Feedback>
                </FloatingLabel>
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  <i className={`bi ${showCurrentPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                </InputGroup.Text>
              </InputGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button 
              className='button-delete-account'
              onClick={handleDeleteAccount} 
              disabled={isDeleting}
            >
              {isDeleting ? <Spinner animation="border" size="sm" /> : "Confirm"}
            </Button>
            <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
    </Page>
  );
}

export default Settings;
