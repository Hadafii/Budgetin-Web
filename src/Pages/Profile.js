import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Page from '../components/Page';
import '../style/profile.css';

function Profile({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [isEditing, setIsEditing] = useState(false);

  const originalUserData = {
    username: 'johndoe',
    email: 'johndoe@example.com',
    birthdate: '26/01/2022', 
    JenisKelamin: 'Laki-Laki', 
  };

  const [userData, setUserData] = useState(originalUserData);

  const formatBirthdate = (date) => {
    if (!date || !date.includes('-')) return date; 
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`; 
  };
  
  const unformatBirthdate = (date) => {
    if (!date) return '';
    if (date.includes('/')) {
     
      const [day, month, year] = date.split('/');
      return `${year}-${month}-${day}`; 
    }
    return date; 
  };

  const handleEditToggle = () => {
    if (isEditing) {
      setUserData(originalUserData);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setUserData((prev) => ({
      ...prev,
      birthdate: formatBirthdate(unformatBirthdate(prev.birthdate)),
    }));
  };

  return (
      <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
      >
        <Container className="profile-container mt-4">
          <Row>
            <Col>
              <div className="profile-header">
                <h1>Profil</h1>
                <i
                  className="bi bi-pencil-square edit-icon"
                  onClick={handleEditToggle}
                  title="Edit Profil"
                ></i>
              </div>
              <div className="profile">
                <div className="profile-field">
                  <label>Nama Pengguna:</label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{userData.username}</span>
                  )}
                </div>
                <div className="profile-field">
                  <label>Jenis Kelamin:</label>
                  {isEditing ? (
                    <div>
                      <Form.Check
                        inline
                        label="Laki-Laki"
                        name="JenisKelamin"
                        type="radio"
                        id="gender-laki-laki"
                        value="Laki-Laki"
                        checked={userData.JenisKelamin === 'Laki-Laki'}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        inline
                        label="Perempuan"
                        name="JenisKelamin"
                        type="radio"
                        id="gender-perempuan"
                        value="Perempuan"
                        checked={userData.JenisKelamin === 'Perempuan'}
                        onChange={handleInputChange}
                      />
                      <Form.Check
                        inline
                        label="Tidak tahu"
                        name="JenisKelamin"
                        type="radio"
                        id="gender-tidaktahu"
                        value="Tidaktahu"
                        checked={userData.JenisKelamin === 'Tidaktahu'}
                        onChange={handleInputChange}
                      />
                    </div>
                  ) : (
                    <span>{userData.JenisKelamin}</span>
                  )}
                </div>

                <div className="profile-field">
                  <label>Email:</label>
                  {isEditing ? (
                    <Form.Control
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>

                <div className="profile-field">
                  <label>Tanggal Lahir:</label>
                  {isEditing ? (
                    <Form.Control
                      type="date"
                      name="birthdate"
                      value={unformatBirthdate(userData.birthdate)}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <span>{formatBirthdate(userData.birthdate)}</span>
                  )}
                </div>

                {isEditing && (
                  <div className="action-buttons">
                    <Button className="btn btn-primary" onClick={handleSave}>
                      Save
                    </Button>
                    <Button
                      className="btn btn-secondary ms-2"
                      onClick={handleEditToggle}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
    </Page>
  );
}

export default Profile;
