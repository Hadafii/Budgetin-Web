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
      setUsernameError('Please enter a username.');
      setUsernameValid(false);
      hasError = true;
    } else {
      const checkUsername = async (username) => {
        const token = localStorage.getItem("token"); // Assumes JWT is stored in localStorage
        try {
            const response = await fetch(`/GatewayApi/v1/checkUsername?username=${username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Attach JWT here
                }
            });
    
            if (!response.ok) {
                throw new Error("Failed to validate username");
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error in checkUsername:", error);
            return { success: false, message: "Error validating username" };
        }
    };
    
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
    } else {
      setError('');
      setValidated(true);
      const registerUser = async (userData) => {
        const token = localStorage.getItem("token");
    
        try {
            const response = await fetch('/GatewayApi/v1/registerUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(userData)
            });
    
            if (response.status === 401) {
                // Token is invalid or expired
                console.error("Unauthorized - redirecting to login");
                window.location.href = "/login"; // Redirect to login
                return;
            }
    
            if (!response.ok) {
                throw new Error("Failed to register user");
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error in registerUser:", error);
            return { success: false, message: "Error registering user" };
        }
    };
    
    }
  };

  return (
    <Container className="signin-container d-flex justify-content-center align-items-center vh-100">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="signin-form p-4">
        <h1 className="text-center mb-3"><b>Create Account</b></h1>

        <FloatingLabel controlId="formBasicUsername" label="Username" className="mb-3">
          <Form.Control 
            type="text" 
            placeholder="Username" 
            required 
            isInvalid={usernameValid === false} 
            isValid={usernameValid === true} 
          />
          <Form.Text className="text-danger">{usernameError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formBasicPassword" label="Password" className="mb-3">
          <Form.Control 
            type="password" 
            placeholder="Password" 
            required 
            isInvalid={passwordValid === false} 
            isValid={passwordValid === true} 
          />
          <Form.Text className="text-danger">{passwordError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formNama" label="Name" className="mb-3">
          <Form.Control 
            type="text" 
            placeholder="Name" 
            required 
            isInvalid={nameValid === false} 
            isValid={nameValid === true} 
          />
        </FloatingLabel>

        <FloatingLabel controlId="formEmail" label="Email" className="mb-3">
          <Form.Control 
            type="email" 
            placeholder="Email" 
            required 
            isInvalid={emailValid === false} 
            isValid={emailValid === true} 
          />
          <Form.Text className="text-danger">{emailError}</Form.Text>
        </FloatingLabel>

        <FloatingLabel controlId="formTanggalLahir" label="Date of Birth" className="mb-3">
          <Form.Control 
            type="date" 
            required 
            isInvalid={dobValid === false} 
            isValid={dobValid === true} 
          />
        </FloatingLabel>

        <Form.Group controlId="formJenisKelamin" className="mb-3">
          <Form.Select required aria-label="Gender" isInvalid={genderValid === false} isValid={genderValid === true}>
            <option selected disabled value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Rather not say</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formRole" className="mb-4">
          <Form.Select required aria-label="Occupation" isInvalid={roleValid === false} isValid={roleValid === true}>
            <option selected disabled value="">Select Occupation</option>
            <option value="Student">Student</option>
            <option value="Worker">Worker</option>
          </Form.Select>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button type="submit" className="signin-button w-100 mb-3">
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
