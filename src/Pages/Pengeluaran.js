import React, { useState, useEffect } from 'react';
import PageNav from '../components/PageNav';
import { Container, Row, Col, Button, Form, Modal, FloatingLabel, Spinner } from 'react-bootstrap';
import '../style/Pengeluaran.css';
import directUp from '../Assets/direct-up.svg';

function Pengeluaranform() {
    const [jumlahPengeluaran, setJumlahPengeluaran] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [tujuan, setTujuan] = useState('');
    const [deskripsi, setDeskripsi] = useState('');
    const [errors, setErrors] = useState({});
    const [saldo, setSaldo] = useState(null); 
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        const fetchSaldo = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getUserBalance", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (result.success) {
                    setSaldo(result.balance); 
                } else {
                    setModalContent('Gagal mengambil saldo pengguna.');
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Error fetching balance:", error);
                setModalContent('Terjadi kesalahan saat mengambil saldo.');
                setShowModal(true);
            }
        };

        fetchSaldo();
    }, []);

    const handleCloseModal = () => setShowModal(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let validationErrors = {};

        if (!tanggal) {
            validationErrors.tanggal = 'Tanggal tidak boleh kosong';
        }
        if (jumlahPengeluaran <= 0 || !jumlahPengeluaran) {
            validationErrors.jumlahPengeluaran = 'Jumlah pengeluaran harus lebih dari 0';
        } else if (saldo !== null && jumlahPengeluaran > saldo) {
            validationErrors.jumlahPengeluaran = `Pengeluaran tidak boleh melebihi saldo Anda. Saldo saat ini: Rp ${saldo}`;
        }
        if (!tujuan) {
            validationErrors.tujuan = 'Tujuan tidak boleh kosong';
        }
        if (!deskripsi) {
            validationErrors.deskripsi = 'Deskripsi tidak boleh kosong';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true); 

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/postSpending", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: jumlahPengeluaran,
                    transaction_date: tanggal,
                    spending_category_id: parseInt(tujuan, 10),
                    description: deskripsi,
                }),
            });

            const result = await response.json();

            if (result.success) {
                const notifyResponse = await fetch("https://api.dafiutomo.com/GatewayApi/v1/checkAndNotifyBudget", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        category_id: tujuan,
                        amount: jumlahPengeluaran,
                    }),
                });

                const notifyResult = await notifyResponse.json();

                if (notifyResult.success) {
                    setModalContent('Pengeluaran berhasil disimpan!');
                } 

                setShowModal(true);

                setSaldo((prevSaldo) => prevSaldo - jumlahPengeluaran);

                setJumlahPengeluaran('');
                setTanggal('');
                setTujuan('');
                setDeskripsi('');
            } else {
                setModalContent('Gagal menyimpan pengeluaran!');
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error posting transaction:", error);
            setModalContent('Terjadi kesalahan saat menyimpan data.');
            setShowModal(true);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <PageNav>
            <div className="container pb-4">
                <a href="/Dashboard" className='budgetin-linked'>
                    <h4>
                        <i className="bi bi-caret-left-fill"></i> Kembali
                    </h4>
                </a> 
            </div>
            <Container>
                <h7><i>Transaksi yang Anda tulis, tidak dapat diubah!</i></h7>
            </Container>
            <Container className="container shadow p-5 rounded-4">
                <Row>
                    <Col>
                        <Form className="Pengeluaran-form" onSubmit={handleSubmit}>
                            <Row className="align-items-center mb-4">
                                <Col className="d-flex align-items-center">
                                    <div className='border rounded-circle'>
                                        <img src={directUp} className='p-1' width='50px'></img>
                                    </div>
                                    <h1 className="mx-2"><b>Identifikasi Pengeluaran</b></h1>
                                </Col>
                            </Row>
                            <Form.Group className="mb-3">
                                <Form.Label>Masukkan Tanggal Pengeluaran Anda</Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder="Tanggal Pengeluaran"
                                    className="input-field"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    isInvalid={!!errors.tanggal}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.tanggal}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Pilihlah Tujuan Pengeluaran Anda</Form.Label>
                                        <FloatingLabel
                                            controlId="floatingTujuan"
                                            label="Pilihlah Tujuan Pengeluaran Anda"
                                            className="mb-3"
                                        >
                                            <Form.Select
                                                value={tujuan}
                                                onChange={(e) => setTujuan(e.target.value)}
                                                isInvalid={!!errors.tujuan}
                                            >
                                                <option disabled value="">Pilih Kategori</option>
                                                <option value="1">Makanan & Minuman</option>
                                                <option value="2">Belanja</option>
                                                <option value="3">Transfer</option>
                                                <option value="4">Bahan Makanan</option>
                                                <option value="5">Biaya Admin</option>
                                                <option value="6">Donasi</option>
                                                <option value="7">Hadiah</option>
                                                <option value="8">Hiburan</option>
                                                <option value="9">Investasi</option>
                                                <option value="10">Kesehatan</option>
                                                <option value="11">Miscellaneous</option>
                                                <option value="12">Perjalanan</option>
                                                <option value="13">Pajak</option>
                                                <option value="14">Pembayaran</option>
                                                <option value="15">Pendidikan</option>
                                                <option value="16">Pengeluaran Usaha</option>
                                                <option value="17">Perlengkapan Rumah Tangga</option>
                                                <option value="18">Utilitas</option>
                                                <option value="19">Transportasi</option>
                                                <option value="20">Uang Tunai</option>
                                                <option value="21">Kebutuhan Lainnya</option>
                                            </Form.Select>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.tujuan}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Masukkan Jumlah Pengeluaran Anda</Form.Label>
                                        <FloatingLabel
                                            controlId="floatingJumlahPengeluaran"
                                            label="Rp."
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="number"
                                                placeholder="Rp. Jumlah"
                                                className="input-field"
                                                value={jumlahPengeluaran}
                                                onChange={(e) => setJumlahPengeluaran(e.target.value)}
                                                isInvalid={!!errors.jumlahPengeluaran}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.jumlahPengeluaran}
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Deskripsi Pengeluaran</Form.Label>
                                <FloatingLabel
                                    controlId="floatingDeskripsi"
                                    label="Deskripsikan Pengeluaran kamu!"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        placeholder="Deskripsi Pengeluaran Anda"
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
                                <Button id="submit" type="submit" disabled={loading}>
                                    {loading ? (
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        "Confirm"
                                    )}
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

export default Pengeluaranform;
