import React, { useState } from 'react';
import PageNav from '../components/PageNav';
import { Container, Row, Col, Button, Form, Modal,FloatingLabel } from 'react-bootstrap';
import '../style/Pendapatan.css';
import directDownlogo from '../Assets/direct-down.svg';

function Pendapatanform() {
    const [jumlahPemasukan, setJumlahPemasukan] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [sumber, setSumber] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [errors, setErrors] = useState('');
    const [earning, setEarning] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = {};

        if (!tanggal) {
            validationErrors.tanggal = 'Tanggal tidak boleh kosong';
        }
        if (jumlahPemasukan <= 0 || !jumlahPemasukan) {
            validationErrors.jumlahPemasukan = 'Jumlah pendapatan harus lebih dari 0';
        }
        if (!sumber) {
            validationErrors.sumber = 'Sumber tidak boleh kosong';
        }
        if (!deskripsi){
            validationErrors.deskripsi = 'Deskripsi tidak boleh kosong';
        }


        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/postEarning", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: jumlahPemasukan,
                    transaction_date: tanggal,
                    earning_category_id: parseInt(sumber, 10),
                    description: deskripsi
                })
            });

            const result = await response.json();
            if (result.success) {
                setModalContent('Pendapatan berhasil disimpan!');
                setShowModal(true);

                setJumlahPemasukan('');
                setTanggal('');
                setSumber('');
                setDeskripsi('');

            } else {
                setModalContent('Gagal menyimpan Pendapatan!');
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error posting transaction:", error);
            setModalContent('Terjadi kesalahan saat menyimpan data.');
            setShowModal(true);
        }
    };

    
    return (
        <PageNav> 
            <div className='container pb-4'>
                <a href="/Dashboard" className='budgetin-linked'>
                    <h4>
                        <i className="bi bi-caret-left-fill"></i> Kembali
                    </h4>
                </a> 
            </div>
            <Container className="container shadow p-5 rounded-4">
                <Row>
                    <Col>
                        <Form className="Pemasukan-form" onSubmit={handleSubmit}>
                            <Row className="align-items-center mb-4">
                                <Col className="d-flex align-items-center">
                                    <div className='border rounded-circle'>
                                        <img src={directDownlogo} className='p-1' width='50px' ></img>
                                    </div>
                                  <h1 className="mx-2"><b>Record Pendapatan</b></h1>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Masukkan Tanggal Pendapatan Anda</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Tanggal Pendapatan"
                                    className="input-field"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    isInvalid={!!errors.tanggal}
                                    size='lg'
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.tanggal}
                                </Form.Control.Feedback>
                            </Form.Group>

                          <Row>
                            <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Pilihlah Sumber Pendapatan Anda</Form.Label>
                                <FloatingLabel
                                    controlId="floatingSumber"
                                    label="Pilihlah Sumber Pendapatan Anda"
                                    className="mb-3"
                                >
                                    <Form.Select
                                        value={sumber}
                                        onChange={(e) => setSumber(e.target.value)}
                                        isInvalid={!!errors.sumber}
                                    >
                                        <option disabled value="">Pilih Kategori</option>
                                        <option value="1">Investasi</option>
                                        <option value="2">Cashback</option>
                                        <option value="3">Gaji</option>
                                        <option value="4">Miscellaneous</option>
                                        <option value="5">Cash Deposit</option>
                                        <option value="6">Transfer dari Akun</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.sumber}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            </Col>

                            <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Masukkan Jumlah Pendapatan Anda</Form.Label>
                                <FloatingLabel
                                    controlId="floatingJumlahPemasukan"
                                    label="Rp."
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="number"
                                        placeholder="Rp. Jumlah"
                                        className="input-field"
                                        value={jumlahPemasukan}
                                        onChange={(e) => setJumlahPemasukan(e.target.value)}
                                        isInvalid={!!errors.jumlahPemasukan}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.jumlahPemasukan}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                            </Form.Group>
                            </Col>
                          </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Deskripsi Pendapatan</Form.Label>
                                <FloatingLabel
                                    controlId="floatingDeskripsi"
                                    label="Deskripsikan Pendapatan kamu!"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Deskripsi Pendapatan Anda"
                                        className="input-field"
                                        value={deskripsi}
                                        onChange={(e) => setDeskripsi(e.target.value)}
                                        isInvalid={!!errors.deskripsi}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.deskripsi}
                                    </Form.Control.Feedback>
                                </FloatingLabel>

                            </Form.Group>

                            <div className="button-container mt-4">
                            <Button id="submit" type="submit">
                                Confirm
                            </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Informasi</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalContent}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </PageNav>
    );
}

export default Pendapatanform;
