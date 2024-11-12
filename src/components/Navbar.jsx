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
    <Navbar style={{ backgroundColor: '#15B7B9' }} variant="dark" className="px-4 shadow sticky-top container-fluid">

      <Navbar.Brand href="#" className="align-items-end ps-4 py-0">
        <img src={BudgetinLogo} alt="Budgetin Logo" width="130" height="40" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-content" />
      <Navbar.Collapse id="navbar-content" className="justify-content-end">
        {/* Navbar content for larger screens */}
        <Nav className="d-flex align-items-center">
          <div className="d-flex align-items-center gap-3">
            <NotificationPopover />
            <Dropdown align="end" className='button-user'>
              <Dropdown.Toggle
                className="d-flex align-items-center text-light transparent-button"
                id="button-user" href='/Profile'
              >
                <span className="me-2" >{accountName || 'Account'} </span>
                <i className="bi bi-person-circle"></i>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
