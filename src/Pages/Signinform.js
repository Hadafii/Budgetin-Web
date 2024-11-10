import React, { useState } from 'react';
import { Button, Form, Container, FloatingLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../style/Signinform.css';

function Signinform() {
  const [validated, setValidated] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [error, setError] = useState('');

  // Individual states for controlling validation styles
  const [usernameValid, setUsernameValid] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [nameValid, setNameValid] = useState(null);
  const [dobValid, setDobValid] = useState(null);
  const [genderValid, setGenderValid] = useState(null);
  const [roleValid, setRoleValid] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    let hasError = false;

    // Username validation
    const username = form.formBasicUsername.value.trim();
    if (!username) {
        setUsernameError('Username is required');
        setUsernameValid(false);
        hasError = true;
    } else {
        // Lakukan pengecekan ke API
        try {
            const response = await fetch(`https://api.dafiutomo.com/GatewayApi/v1/checkUsername?username=${username}`);
            const data = await response.json();
            if (!data.success) {
                setUsernameError(data.message); // Pesan error jika username sudah ada
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

    // Email validation
    const email = form.formEmail.value.trim();
    if (!email) {
      setEmailError('Please enter an email address.');
      setEmailValid(false);
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      setEmailValid(false);
      hasError = true;
    } else {
      setEmailError('');
      setEmailValid(true);
    }

    // Password validation
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

    // Name validation
    const name = form.formNama.value.trim();
    if (!name) {
      setNameValid(false);
      hasError = true;
    } else {
      setNameError('');
      setNameValid(true);
    }

    // Date of Birth validation
    const dob = form.formTanggalLahir.value;
    if (!dob) {
      setDobValid(false);
      hasError = true;
    } else {
      setDobError('');
      setDobValid(true);
    }

    // Gender validation
    const gender = form.formJenisKelamin.value;
    if (!gender) {
      setGenderValid(false);
      hasError = true;
    } else {
      setGenderError('');
      setGenderValid(true);
    }

    // Occupation validation
    const role = form.formRole.value;
    if (!role) {
      setRoleValid(false);
      hasError = true;
    } else {
      setRoleError('');
      setRoleValid(true);
    }

    if (hasError) {
      setError('Please fill out all required fields correctly.');
      setValidated(false); // Menandai form sebagai invalid
  } else {
      setError('');
      setValidated(true); // Menandai form sebagai valid
      try {
        const response = await fetch('https://api.dafiutomo.com/GatewayApi/v1/registerUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: form.formBasicUsername.value,
                password: form.formBasicPassword.value,
                email: form.formEmail.value,
                account_name: form.formNama.value,
                birth_date: form.formTanggalLahir.value,
                gender: form.formJenisKelamin.value,
                role: form.formRole.value,
            }),
        });
        const data = await response.json();

        if (data.success) {
            // Simpan token di localStorage
            localStorage.setItem('token', data.token);
            // Redirect ke dashboard
            window.location.href = '/dashboard';
        } else {
            setError(data.message);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        setError("An error occurred during registration.");
    }
  }
  };

  return (
    <Container className="signin-container d-flex justify-content-center align-items-center vh-100">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="signin-form p-4">
        <h1 className="text-center mb-3"><b>Create Account</b></h1>

        <FloatingLabel controlId="formBasicUsername" label="Username" className="mb-3 iniformsignin">
          <Form.Control 
            type="text" 
            placeholder="Username" 
            required className="isiformsignin" 
            isInvalid={usernameValid === false} 
            isValid={usernameValid === true} 
          />
          <Form.Text className="text-danger">{usernameError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formBasicPassword" label="Password" className="mb-3 iniformsignin">
          <Form.Control 
            type="password" 
            placeholder="Password" 
            required className="isiformsignin" 
            isInvalid={passwordValid === false} 
            isValid={passwordValid === true} 
          />
          <Form.Text className="text-danger">{passwordError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formNama" label="Name" className="mb-3 iniformsignin">
          <Form.Control 
            type="text" 
            placeholder="Name" 
            required className="isiformsignin" 
            isInvalid={nameValid === false} 
            isValid={nameValid === true} 
          />
        </FloatingLabel>

        <FloatingLabel controlId="formEmail" label="Email" className="mb-3 iniformsignin">
          <Form.Control 
            type="email" 
            placeholder="Email" 
            required className="isiformsignin" 
            isInvalid={emailValid === false} 
            isValid={emailValid === true} 
          />
          <Form.Text className="text-danger">{emailError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formTanggalLahir" label="Date of Birth" className="mb-3 iniformsignin">
          <Form.Control 
            type="date" 
            required className="isiformsignin" 
            isInvalid={dobValid === false} 
            isValid={dobValid === true} 
          />
        </FloatingLabel>

        <Form.Group controlId="formJenisKelamin" className="mb-3 iniformsignin">
          <Form.Select required className="isiformsignin" aria-label="Gender" isInvalid={genderValid === false} isValid={genderValid === true}>
            <option selected disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Rather not say</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formRole" className="mb-4 iniformsignin">
          <Form.Select required className="isiformsignin" aria-label="Occupation" isInvalid={roleValid === false} isValid={roleValid === true}>
            <option selected disabled value="">Select Occupation</option>
            <option value="Student">Student</option>
            <option value="Worker">Worker</option>
          </Form.Select>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button type="submit" className="signin-button w-100 mb-3 iniformsignin">
          Sign Up
        </Button>

        <div className="text-center">
          <p>Already have an account? <Link to="/login" className="login-link">Log in here!</Link></p>
        </div>
      </Form>
    </Container>
  );
}

export default Signinform;
