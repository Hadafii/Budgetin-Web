import React, { useState, useEffect } from "react";
import OverviewCard from "../components/OverviewCard";
import BudgetCard from "../components/Sisa Budget/CardSisaBudget";
import TransaksiTerbaru from "../components/LaporanKeuangan/TransaksiTerbaru";
import OverviewLaporanUangRechart from "../components/LaporanKeuangan/OverviewLaporanUangRechart";
import "../style/Dashboard.css";
import Page from "../components/Page";

function Dashboard({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
    const [accountName, setAccountName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const refreshToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/Login";
            return;
        }

        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/refreshToken", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();
            if (result.success) {
                localStorage.setItem("token", result.token); 
                return true;
            } else {
                localStorage.removeItem("token"); 
                window.location.href = "/Login";
                return false;
            }
        } catch (err) {
            console.error("Failed to refresh token:", err);
            localStorage.removeItem("token");
            window.location.href = "/Login";
        }
    };

    const fetchAccountName = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/Login";
            return;
        }

        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/AccountName", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const result = await response.json();

            if (result.success) {
                setAccountName(result.account_name);
            } else if (result.message === "Invalid token") {
                console.warn("Token expired. Attempting to refresh...");
                const refreshed = await refreshToken();
                if (refreshed) {
                    fetchAccountName(); 
                }
            } else {
                console.error("Failed to fetch account name:", result.message);
            }
        } catch (err) {
            console.error("Failed to fetch account name:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccountName();
    }, []);

    return (
        <Page
            collapsed={collapsed}
            toggleSidebar={toggleSidebar}
            showOffcanvas={showOffcanvas}
            handleShowOffcanvas={handleShowOffcanvas}
            handleCloseOffcanvas={handleCloseOffcanvas}
        >
            <div className="container">
                <h1>
                    <strong>{isLoading ? "Loading..." : `Hi, ${accountName || "Pengguna"}!`}</strong>
                </h1>
                <p>Selamat datang di dashboard Anda!</p>

                <div className="row-flex pb-3 d-none d-lg-flex">
                    <div className=" overview">
                        <OverviewCard />
                    </div>
                    <div className=" budget-card">
                        <BudgetCard />
                    </div>
                </div>
                <div className="row-flex pb-3 d-none d-lg-flex">
                    <div className="overview-laporan">
                        <OverviewLaporanUangRechart />
                    </div>
                    <div className="transaksi-terbaru">
                        <TransaksiTerbaru />
                    </div>
                </div>

                <div className="row d-flex d-lg-none g-4">
                    <OverviewCard />
                    <BudgetCard />
                    <OverviewLaporanUangRechart />
                    <TransaksiTerbaru />
                </div>


            </div>
        </Page>
    );
}

export default Dashboard;
