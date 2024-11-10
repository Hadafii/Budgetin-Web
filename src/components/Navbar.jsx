import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import '../Component Style/Navbar.css';
import BudgetinLogo from '../Assets/Budgetinsvg-white.svg';
import NotificationPopover from './Notifikasi';

const NavBar = ( ) => {
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const fetchAccountName = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/AccountData", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log("Account Name Result:", result); // Log response

            if (result.success) {
                setAccountName(result.account_name); // Simpan `account_name` di state `accountName`
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
    <Navbar
      sticky="top"
      style={{ backgroundColor: '#15B7B9' }}
      variant="dark"
      expand="md"
      className="px-4 shadow-sm sticky-top container-fluid"
    >
      <Navbar.Brand href="#" className="d-flex align-items-center ps-4">
        <img src={BudgetinLogo} alt="Budgetin Logo" width="130" height="40" />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-content" />

      <Navbar.Collapse id="navbar-content" className="justify-content-end">
        {/* Navbar content for larger screens */}
        <Nav className="d-none d-md-flex align-items-center">
          <div className="d-flex align-items-center gap-3">
            <NotificationPopover />
            <Dropdown align="end" className='button-user'>
              <Dropdown.Toggle
                className="d-flex align-items-center text-light transparent-button"
                id="button-user"
              >
                <span className="me-2">{accountName || 'Account'}</span>
                <i className="bi bi-person-circle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/Settings">Settings</Dropdown.Item>
                <Dropdown.Item href="/Logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>

        {/* Navbar content for smaller screens */}
        <Nav className="d-md-none bg-none text-dark pt-1">
          <div className="d-flex flex-column gap-2">
            <Nav.Link href="/Notification">Show Notification</Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle as={Button} variant="light" id="dropdown-basic">
                {accountName || 'Account'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/Profile">Profile</Dropdown.Item>
                <Dropdown.Item href="/Settings">Settings</Dropdown.Item>
                <Dropdown.Item href="/Logout">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
