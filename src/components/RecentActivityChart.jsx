import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Row, Col } from 'react-bootstrap';

const RecentActivityChart = ({ selectedMonth, selectedYear }) => {
    const [transactions, setTransactions] = useState([]);

    const monthMapping = {
        Januari: 1, Februari: 2, Maret: 3, April: 4, Mei: 5, Juni: 6,
        Juli: 7, Agustus: 8, September: 9, Oktober: 10, November: 11, Desember: 12
    };

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        const month = monthMapping[selectedMonth];
        const year = selectedYear;

        try {
            const response = await fetch(
                `https://api.dafiutomo.com/GatewayApi/v1/getTransactionsByMonth?month=${month}&year=${year}`, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
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
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, selectedYear]);

    const data = transactions.reduce((acc, trans) => {
        const existingDate = acc.find((item) => item.date === trans.date);
        if (existingDate) {
            if (trans.type === 'spending') {
                existingDate.spending += trans.amount;
            } else if (trans.type === 'earning') {
                existingDate.earning += trans.amount;
            }
        } else {
            acc.push({
                date: trans.date,
                spending: trans.type === 'spending' ? trans.amount : 0,
                earning: trans.type === 'earning' ? trans.amount : 0,
            });
        }
        return acc;
    }, []);

    return (
        <Card className="shadow p-3 mb-4 border-0 rounded-4">
            <Card.Body className="d-flex flex-column" style={{ minHeight: '350px', height: '100%' }}>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <Card.Title className="fs-5"><strong>Grafik Aktivitas Keuangan</strong></Card.Title>
                    </Col>
                </Row>
                <div style={{ width: '100%', height: '350px' }}>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `Rp. ${value}`} />
                            <Tooltip
                                formatter={(value) =>
                                    `Rp. ${value.toLocaleString('id-ID')}` 
                                }
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

export default RecentActivityChart;
