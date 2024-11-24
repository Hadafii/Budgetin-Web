import React, { useState } from 'react';
import { Button, Form, Container, FloatingLabel, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Signinform.css';

function Signinform() {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [error, setError] = useState('');

  const [usernameValid, setUsernameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);
  const [dobValid, setDobValid] = useState(null);
  const [genderValid, setGenderValid] = useState(null);
  const [roleValid, setRoleValid] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    let hasError = false;

    const username = form.formBasicUsername.value.trim();
    const usernamePattern = /^[a-z]{4,}$/; 
    if (!username) {
        setUsernameError('Username is required');
        setUsernameValid(false);
        hasError = true;
    } else if (!usernamePattern.test(username)) {
        setUsernameError('Username must be at least 4 characters long, lowercase letters only, and no spaces.');
        setUsernameValid(false);
        hasError = true;
    } else {
        try {
            const response = await fetch(`https://api.dafiutomo.com/GatewayApi/v1/checkUsername?username=${username}`);
            const data = await response.json();
            if (!data.success) {
                setUsernameError(data.message); 
                setUsernameValid(false);
                hasError = true;
            } else {
                setUsernameError('');
                setUsernameValid(true);
            }
        } catch (error) {
            console.error("Error checking username:", error);
            setUsernameError('Failed to check username availability');
            setUsernameValid(false);
            hasError = true;
        }
    }

    const email = form.formEmail.value.trim();
    if (!email) {
        setEmailError('Please enter an email address.');
        setEmailValid(false);
        hasError = true;
    } else if (/\s/.test(email)) { // Validasi spasi di email.
        setEmailError('Email must not contain spaces.');
        setEmailValid(false);
        hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('Please enter a valid email address.');
        setEmailValid(false);
        hasError = true;
    } else {
        try {
            const response = await fetch(`https://api.dafiutomo.com/GatewayApi/v1/checkEmail?email=${email}`);
            const data = await response.json();
            if (!data.success) {
                setEmailError(data.message); 
                setEmailValid(false);
                hasError = true;
            } else {
                setEmailError('');
                setEmailValid(true);
            }
        } catch (error) {
            console.error("Error checking email:", error);
            setEmailError('Failed to check email availability');
            setEmailValid(false);
            hasError = true;
        }
    }

    const password = form.formBasicPassword.value.trim();
    const invalidCharPattern = /[\u3164]/;
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
      setPasswordValid(false);
      hasError = true;
    } else if (invalidCharPattern.test(password)) {
      setPasswordError('Password contains invalid characters.');
      setPasswordValid(false);
      hasError = true;
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }

    const name = form.formNama.value.trim();
    if (!name) {
      setNameValid(false);
      hasError = true;
    } else {
      setNameError('');
      setNameValid(true);
    }

    const dob = form.formTanggalLahir.value;
    if (!dob) {
        setDobError('Tanggal lahir harus diisi.');
        setDobValid(false);
        hasError = true;
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--; 
        }

        
        if (age < 13) {
            setDobError('Anda harus berusia minimal 13 tahun untuk mendaftar.');
            setDobValid(false);
            hasError = true;
        } else {
            setDobError('');
            setDobValid(true);
        }
    }

    const gender = form.formJenisKelamin.value;
    if (!gender) {
      setGenderValid(false);
      hasError = true;
    } else {
      setGenderError('');
      setGenderValid(true);
    }

    const role = form.formRole.value.trim();
    if (!role || role === "Pilih Role") {
        setRoleError('Silakan pilih role yang valid.');
        setRoleValid(false);
        hasError = true;
    } else {
        setRoleError('');
        setRoleValid(true);
    }


    if (hasError) {
      setError('Please fill out all required fields correctly.');
      setValidated(false); 
      setLoading(false);
  } else {
      setError('');
      setValidated(true); 
      try {
          const response = await fetch('https://api.dafiutomo.com/GatewayApi/v1/registerUser', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  username: form.formBasicUsername.value.trim(),
                  password: form.formBasicPassword.value.trim(),
                  email: form.formEmail.value.trim(),
                  account_name: form.formNama.value.trim(),
                  birth_date: form.formTanggalLahir.value.trim(),
                  gender: form.formJenisKelamin.value.trim(),
                  role: form.formRole.value.trim(),
              }),
          });
  
          const data = await response.json();
  
          if (response.ok && data.success) {
              window.location.href = `/verify-email?email=${encodeURIComponent(form.formEmail.value.trim())}`;
          } else {
              setError(data.message || 'Failed to register. Please try again.');
          }
      } catch (error) {
          console.error("Error during registration:", error);
          setError("An error occurred during registration. Please try again later.");
      } finally {
          setLoading(false); 
      }
  }
  
  };

  return (
    <Container className="signin-container d-flex justify-content-center align-items-center">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="signin-form p-4">
        <h1 className="text-center mb-3"><b>Create Account</b></h1>

        <FloatingLabel controlId="formBasicUsername" label="Username (Tidak dapat diubah!)" className="mb-3 iniformsignin text-center">
          <Form.Control 
            type="text" 
            placeholder="Username "  
            required className="isiformsignin" 
            isInvalid={usernameValid === false} 
            isValid={usernameValid === true} 
          />
          <Form.Text className="text-danger">{usernameError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formBasicPassword" label="Password" className="mb-3 iniformsignin text-center">
          <Form.Control 
            type={showPassword ? "text" : "password"}
            placeholder="Password" 
            required className="isiformsignin isiformsignin-password" 
            isInvalid={passwordValid === false} 
            isValid={passwordValid === true} 
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
          <Form.Text className="text-danger">{passwordError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formNama" label="Name" className="mb-3 iniformsignin text-center">
          <Form.Control 
            type="text" 
            placeholder="Name" 
            required className="isiformsignin" 
            isInvalid={nameValid === false} 
            isValid={nameValid === true} 
          />
        </FloatingLabel>

        <FloatingLabel controlId="formEmail" label="Email" className="mb-3 iniformsignin text-center">
          <Form.Control 
            type="email" 
            placeholder="Email" 
            required className="isiformsignin" 
            isInvalid={emailValid === false} 
            isValid={emailValid === true} 
          />
          <Form.Text className="text-danger">{emailError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formTanggalLahir" label="Date of Birth" className="mb-3 iniformsignin text-center">
          <Form.Control 
            type="date" 
            required 
            className="isiformsignin" 
            isInvalid={dobValid === false} 
            isValid={dobValid === true} 
          />
          <Form.Text className="text-danger">{dobError}</Form.Text>
        </FloatingLabel>

        <Form.Group controlId="formJenisKelamin" className="mb-3 iniformsignin text-center">
          <Form.Select required className="isiformsignin" aria-label="Gender" isInvalid={genderValid === false} isValid={genderValid === true}>
            <option selected disabled value="">Pilih Jenis Kelamin</option>
            <option value="Male">Laki-Laki</option>
            <option value="Female">Perempuan</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formRole" className="mb-4 iniformsignin text-center">
          <Form.Select required className="isiformsignin" aria-label="Occupation" isInvalid={roleValid === false} isValid={roleValid === true} >
            <option selected disabled>Pilih Role</option>
            <option value="Student">Pelajar</option>
            <option value="Worker">Pekerja</option>
          </Form.Select>
        </Form.Group> 

        {error && <p className="text-danger text-center">{error}</p>}

        <Button type="submit" className="signin-button w-100 mb-3" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
        </Button>

        <div className="text-center">
          <p>Sudah memiliki akun? <Link to="/login" className="login-link">Log in disini!</Link></p>
        </div>
      </Form>
    </Container>
  );
}

export default Signinform;
