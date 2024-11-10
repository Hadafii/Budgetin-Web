import React, { useState, useEffect } from 'react';
import Overview from '../components/OverviewCard';
import '../style/Dashboard.css';
import Page from '../components/Page';

function Dashboard({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
    const [userData, setUserData] = useState(null);
    const [accountName, setAccountName] = useState("");
    

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                window.location.href = "/Login";
                return;
            }

            try {
                const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/users", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                if (result.success) {
                    setUserData(result.data);
                } else {
                    localStorage.removeItem("token");
                    window.location.href = "/Login";
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
                localStorage.removeItem("token");
                window.location.href = "/Login";
            }
        };

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

        fetchUserData();
        fetchAccountName();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/Login";
    };

    return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
            <div className="container">
                <h1><b>Hi, {accountName || "Pengguna"}!</b></h1> {/* Menggunakan accountName */}
                <p>Selamat datang di dashboard Anda!</p>
                <Overview />
                <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
            </div>
    </Page>
    );
}

export default Dashboard;
