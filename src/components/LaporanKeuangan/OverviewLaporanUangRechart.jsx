import React, { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, Row, Col } from "react-bootstrap";

const OverviewLaporanUangRechart = () => {
    const [transactions, setTransactions] = useState(null);
    const [currentMonth, setCurrentMonth] = useState("");

    const getCurrentMonthName = () => {
        const date = new Date();
        return date.toLocaleString("id-ID", { month: "long" }); 
    };

    useEffect(() => {
        setCurrentMonth(getCurrentMonthName());
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getTransactionsCurrentMonth", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                const formattedData = result.data.map((trans) => ({
                    date: new Date(trans.transaction_date).toLocaleDateString("id-ID"),
                    amount: trans.amount,
                    type: trans.type,
                }));
                setTransactions(formattedData);
            } else {
                console.error("Failed to fetch transactions:", result.message);
                setTransactions(null);
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            setTransactions(null);
        }
    };

    const data = transactions
        ? transactions.reduce((acc, trans) => {
            const existingDate = acc.find((item) => item.date === trans.date);
                if (existingDate) {
                    if (trans.type === "spending") {
                        existingDate.spending += trans.amount;
                    }else if (trans.type === "earning") {
                        existingDate.earning += trans.amount;
                    }
                } else {
                    acc.push({
                        date: trans.date,
                        spending: trans.type === "spending" ? trans.amount : 0,
                        earning: trans.type === "earning" ? trans.amount : 0,
                    });
                }
                return acc;
            }, [])
        : [];

    return (
        <Card className="shadow p-3 mb-4 border-0 rounded-4 overview-laporan">
            <Card.Body className="d-flex flex-column" style={{ minHeight: "300px", height: "100%" }}>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <Card.Title className="fs-5">
                            <strong>Laporan Keuangan {currentMonth}</strong>
                        </Card.Title>
                    </Col>
                </Row>
                <div style={{ width: "100%", height: "275px" }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `Rp. ${value}`} />
                            <Tooltip 
                                formatter={(value) => new Intl.NumberFormat('id-ID').format(value)} 
                                labelFormatter={(label) => `Tanggal: ${label}`}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="earning" stroke="#605BFF" strokeWidth={2} dot={{ r: 3 }} />
                            <Line type="monotone" dataKey="spending" stroke="#FCD261" strokeWidth={2} dot={{ r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OverviewLaporanUangRechart;
