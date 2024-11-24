import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, FloatingLabel, Modal, InputGroup  } from 'react-bootstrap';
import PageNav from '../components/PageNav';
import '../style/profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    account_name: '',
    profilePicture: '',
    username: '',
    email: '',
    gender: '',
    birth_date: '',
    phone_number: '',
    occupation_id: '',
  });
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({});

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [selectedRole, setSelectedRole] = useState(userData.occupation_id);
  
  
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/Login";
        return;
      }

      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getUserData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setUserData(result.data);
        } else {
          console.error("User data not found");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };

    fetchUserData();
    
  }, []);

  const saveUserInformation = (e) => {
    e.preventDefault();
    let validationErrors = {};

    const accWordCount = /^\b[a-zA-Z ]{1,16}\b$/; 
    if (!userData.account_name.trim()) {
      validationErrors.account_name = "Nama akun tidak boleh kosong.";
    } else if (!accWordCount.test(userData.account_name)) {
      validationErrors.account_name = "Nama akun hanya boleh berisi huruf dan spasi, dengan panjang maksimal 16 karakter.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userData.email)) {
      validationErrors.email = "Email harus valid dan mengandung '@'";
    }

    if (userData.bio) {
      const bioWordCount = userData.bio.trim().split(/\s+/).length;
      if (bioWordCount > 100) {
        validationErrors.bio = "Bio tidak boleh lebih dari 100 kata.";
      }
    }

    const phonePattern = /^(?:\+62|08)[0-9]{8,13}$/;
    if (userData.phone_number && !phonePattern.test(userData.phone_number)) {
      validationErrors.phone_number = "Nomor telepon harus dimulai dengan +62 atau 08 dan berjumlah 10-15 angka.";
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    fetch('https://api.dafiutomo.com/GatewayApi/v1/updateUserInformation', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        account_name: userData.account_name,
        gender: userData.gender,
        email: userData.email,
        phone_number: userData.phone_number || "",
        bio: userData.bio || "",
      })
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setIsSuccess(true);
          setModalMessage("Informasi berhasil disimpan!");
        } else {
          setIsSuccess(false);
          setModalMessage("Gagal menyimpan informasi. Silakan coba lagi.");
        }
        setShowModal(true); 
      })
      .catch(error => {
        console.error("Error:", error);
        setIsSuccess(false);
        setModalMessage("Terjadi kesalahan pada server.");
        setShowModal(true); 
      });
  };

  const validateCurrentPassword = async () => {
    const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/verifyUserPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password: currentPassword }),
    });
    const result = await response.json();
    return result.success;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const validatePasswordForm = async () => {
    let errors = {};

    if (!await validateCurrentPassword()) {
      errors.currentPassword = "Kata sandi saat ini salah";
    }

    if (newPassword.length < 8) {
      errors.newPassword = "Kata sandi baru harus minimal 8 karakter";
    }

    if (/[^a-zA-Z0-9]/.test(newPassword)) {
      errors.newPassword = "Kata sandi baru mengandung karakter tidak valid";
    }

    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Kata sandi tidak sesuai";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    if (await validatePasswordForm()) {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/updateUserPassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setModalMessage("Kata sandi berhasil diubah");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setIsSuccess(false);
        setModalMessage("Gagal mengubah kata sandi");
      }
      setShowModal(true);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "current") setShowCurrentPassword(!showCurrentPassword);
    else if (field === "new") setShowNewPassword(!showNewPassword);
    else if (field === "confirm") setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const handleSubmitRoleChange = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/updateUserOccupation", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ occupation_id: selectedRole }),
      });
      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setModalMessage("Role berhasil diubah");
        setUserData((prevData) => ({ ...prevData, occupation_id: selectedRole }));
      } else {
        setIsSuccess(false);
        setModalMessage("Gagal mengubah role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      setIsSuccess(false);
      setModalMessage("Terjadi kesalahan. Silakan coba lagi.");
    }

    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const formatBirthdate  = (date) => {
    if (!date) return '';
    const dateObject = new Date(date); 
    const day = String(dateObject.getDate()).padStart(2, '0'); 
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
    const year = dateObject.getFullYear(); 
    return `${day}/${month}/${year}`; 
  };

  return (
    <PageNav>
      <div className='container'>
        <a href="/Dashboard" className='budgetin-linked'>
          <h4>
            <i className="bi bi-caret-left-fill"></i> Kembali
          </h4>
        </a> 
        </div>
      <Container className="profile-container mt-4">
        <Card className="shadow mb-4 border-0">
          <Card.Body className="text-center">
            <div className="mb-3">
              <i
                className="bi bi-person-circle"
                style={{ fontSize: '120px', color: '#535252' }}
              ></i>
            </div>
            <h3 className="font-weight-bold">{userData.account_name || "User Name"}</h3>
            <p className="text-muted"><b>Bio: </b>{userData.bio || "-"}</p>

            <Row className="p-5">
              <h2>Informasi Akun</h2>
              <hr className="w-100 p-0" />
              <Col md={6} className="text-start">
                <p className='pb-1'><strong>Nama Akun</strong> <br/> {userData.account_name || "-"}</p>
                <p className='pb-1'><strong>Username</strong> <br/> {userData.username || "-"}</p>
                <p><strong>Email</strong> <br/>  {userData.email || "-"}</p>
                <p><strong>Negara</strong> <br/>  {"Indonesia"}</p>
              </Col>
              <Col md={6} className="text-start">
                <p className='pb-1'><strong>Tanggal Lahir</strong> <br/>  {formatBirthdate(userData.birth_date) || "-"}</p>
                <p><strong>Jenis Kelamin</strong> <br/>  {userData.gender === "Male" ? "Laki-Laki" : "Perempuan"|| "-"}</p>
                <p><strong>Nomor Telfon</strong> <br/>  {userData.phone_number || "-"}</p>
                <p><strong>Role</strong> <br/>  {userData.occupation_id == "1" ? "Pelajar" : "Pekerja"}</p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <div className=' p-3'>
          <h2 className='text-center'>Edit Profile</h2>
          <hr/>
        </div>

        <Card className="shadow mb-4 p-3">
          <Card.Body>
            <Row>
              <Col md={4} className="text-left">
                <h2>Informasi Pribadi</h2>
                <p className="text-muted">
                  Informasi ini pribadi dan tak akan dibagikan kepada pengguna lain. 
                  Baca Pemberitahuan Privasi kapan saja!
                </p>
              </Col>
              <Col md={8}>
                <Form onSubmit={saveUserInformation}>
                  <FloatingLabel label="Account Name" className="mb-3">
                    <Form.Control
                      type="text"
                      value={userData.account_name}
                      onChange={(e) => setUserData({ ...userData, account_name: e.target.value })}
                      isInvalid={!!errors.account_name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.account_name}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel label="Gender" className="mb-3" >
                    <Form.Control
                      defaultValue={userData.gender == "Male" ? "Laki-Laki" : "Perempuan"}
                      disabled 
                      readOnly={!userData.gender}
                    >
                    </Form.Control>
                  </FloatingLabel>
                  <FloatingLabel label="Email" className="mb-3">
                    <Form.Control
                      type="email"
                      readOnly
                      defaultValue={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel label="Phone Number" className="mb-3">
                    <Form.Control
                      type="text"
                      value={userData.phone_number}
                      onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
                      isInvalid={!!errors.phone_number}
                    />
                    <Form.Control.Feedback type="invalid">{errors.phone_number}</Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel label="Bio" className="mb-3">
                    <Form.Control
                      as="textarea"
                      style={{ height: '80px', maxHeight: '200px' }}
                      value={userData.bio}
                      onChange={(e) => setUserData({ ...userData, bio: e.target.value })}
                      isInvalid={!!errors.bio}
                    />
                    <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
                  </FloatingLabel>
                  <Button className='button-edit-profile' type="submit">Simpan dan Verifikasi</Button>
                </Form>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Modal show={showModal} onHide={handleCloseModal}  centered backdrop="static"
        keyboard={false} >
          <Modal.Header closeButton>
            <Modal.Title>{isSuccess ? "Berhasil" : "Gagal"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{modalMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button className='button-edit-profile'onClick={handleCloseModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>

        <Card className="shadow mb-4 p-3">
          <Card.Body>
            <Row>
              <Col md={4} className="text-left">
                <h2>Ubah Kata Sandi</h2>
                <p className="text-muted">
                  Kami menyarankanmu untuk mengubah kata sandi secara berkala 
                  demi mencegah akses tanpa izin ke akunmu.
                </p>
              </Col>
              <Col md={8}>
                <Form onSubmit={handleSubmitPasswordChange}>
                  <FloatingLabel label="Username" className="mb-3">
                    <Form.Control type="text" value={userData.username} readOnly />
                  </FloatingLabel>
                  
                  <div className="mb-3">
                  <InputGroup >
                    <FloatingLabel label="Kata Sandi Saat Ini" className="flex-grow-1">
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        name="currentPassword"
                        placeholder="Masukkan kata sandi saat ini"
                        value={currentPassword}
                        onChange={handlePasswordChange}
                        isInvalid={!!passwordErrors.currentPassword}
                      />
                    </FloatingLabel>
                    <InputGroup.Text
                      onClick={() => togglePasswordVisibility("current")}
                      style={{ cursor: "pointer" }}
                    >
                      <i className={`bi ${showCurrentPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                    </InputGroup.Text>
                  </InputGroup>
                  {passwordErrors.currentPassword && (
                    <div className="text-danger small mb-3">
                      {passwordErrors.currentPassword}
                    </div>
                  )}
                  </div>
                  <div className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Kata Sandi Baru" className="flex-grow-1">
                        <Form.Control
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          placeholder="Masukkan kata sandi baru"
                          value={newPassword}
                          onChange={handlePasswordChange}
                          isInvalid={!!passwordErrors.newPassword}
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        onClick={() => togglePasswordVisibility("new")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showNewPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {passwordErrors.newPassword && (
                      <Form.Text className="text-danger">
                        {passwordErrors.newPassword}
                      </Form.Text>
                    )}
                  </div>

                  <div className="mb-3">
                    <InputGroup>
                      <FloatingLabel label="Ulangi Kata Sandi Baru" className="flex-grow-1">
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Ulangi kata sandi baru"
                          value={confirmPassword}
                          onChange={handlePasswordChange}
                          isInvalid={!!passwordErrors.confirmPassword}
                        />
                      </FloatingLabel>
                      <InputGroup.Text
                        onClick={() => togglePasswordVisibility("confirm")}
                        style={{ cursor: "pointer" }}
                      >
                        <i className={`bi ${showConfirmPassword ? "bi-eye-fill" : "bi-eye-slash-fill"}`}></i>
                      </InputGroup.Text>
                    </InputGroup>
                    {passwordErrors.confirmPassword && (
                      <Form.Text className="text-danger">
                        {passwordErrors.confirmPassword}
                      </Form.Text>
                    )}
                  </div>
                    {passwordErrors.currentPassword && (
                      <div className=" mb-3 text-start">
                        <div>
                          <p>Lupa kata sandi? <a href="/Forgot-Password" className="sigin-link">
                             Klik di sini
                          </a></p>
                          
                        </div>
                      </div>
                    )}
                    
                  <Button className='button-edit-profile' type="submit">Ubah Kata Sandi</Button>
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
            <Button className='button-edit-profile' onClick={() => setShowModal(false)}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>

      <Card className="shadow mb-4 p-3">
        <Card.Body>
          <Row>
            <Col md={4} className="text-left">
              <h2>Ubah Role</h2>
              <p className="text-muted">
                Role kamu saat ini: <strong>{userData.occupation_id == "1" ? "Pelajar" : "Pekerja"}</strong>
              </p>
            </Col>
            <Col md={8}>
            <Form onSubmit={handleSubmitRoleChange}>
              <FloatingLabel label="Pilih Role" className="mb-3">
                <Form.Select value={selectedRole} onChange={handleRoleChange}>
                  <option value="" disabled></option>
                  <option value="1">Pelajar</option>
                  <option value="2">Pekerja</option>
                </Form.Select>
              </FloatingLabel>
              <Button className="button-edit-profile" type="submit">
                Ubah Role
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
          <Button className='button-edit-profile' onClick={() => setShowModal(false)}>
            Tutup
          </Button>
        </Modal.Footer>
      </Modal>
      </Container>
    </PageNav>
  );
}

export default Profile;
