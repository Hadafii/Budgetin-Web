import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import '../Component Style/Navbar.css';
import BudgetinLogo from '../Assets/Budgetinsvg-white.svg';
import NotificationPopover from './Notifikasi';

const NavBar = () => {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const fetchAccountName = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/AccountName", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();

        if (result.success) {
          setAccountName(result.account_name); 
        } else {
          console.error("Failed to fetch account name:", result.message);
        }
      } catch (err) {
        console.error("Failed to fetch account name:", err);
      }
    };

    fetchAccountName();
  }, []);

  return (
    <Navbar style={{ backgroundColor: '#15B7B9' }} variant="dark" className="px-2 shadow sticky-top">
      <Container fluid>
        <Navbar.Brand href="/Dashboard" className="align-items ps-5 py-0 d-lg-flex d-none">
          <img src={BudgetinLogo} alt="Budgetin Logo" width="130" height="40" />
        </Navbar.Brand>
        <Navbar.Brand href="/Dashboard" className="align-items ps-0 py-0 d-lg-none">
          <img src={BudgetinLogo} alt="Budgetin Logo" width="130" height="40" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-content" />
        <Navbar.Collapse id="navbar-content" className="justify-content-end">
          <Nav className="d-flex align-items-center">
            <div className="d-flex align-items-center gap-3">
              <NotificationPopover />
              <Button
                className="d-flex align-items-center text-light transparent-button"
                id="button-user"
                href="/Profile"
              >
                <span className="me-2 d-lg-inline d-none">{accountName || "Account"}</span>
                <i className="bi bi-person-circle"></i>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
