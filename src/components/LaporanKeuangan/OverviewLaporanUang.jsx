import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Row, Col, Dropdown, ButtonGroup } from 'react-bootstrap';

const OverviewLaporanUang = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const [selectedMonth, setSelectedMonth] = useState(monthNames[currentMonthIndex]);
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [transactions, setTransactions] = useState(null);

    const monthMapping = {
        Januari: 1, Februari: 2, Maret: 3, April: 4, Mei: 5, Juni: 6,
        Juli: 7, Agustus: 8, September: 9, Oktober: 10, November: 11, Desember: 12
    };

    const fetchTransactions = async () => {
        const token = localStorage.getItem("token");
        const month = monthMapping[selectedMonth];
        const year = selectedYear;
        try {
            const response = await fetch(`https://api.dafiutomo.com/GatewayApi/v1/getTransactionsByMonth?month=${month}&year=${year}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            if (result.success) {
                const formattedData = result.data.map((trans) => ({
                    ...trans,
                    transaction_date: new Date(trans.transaction_date).toLocaleDateString("id-ID"),
                }));
                setTransactions(formattedData); 
                console.log("Formatted Data Transaksi:", formattedData); 
            } else {
                console.error("Failed to fetch transactions:", result.message);
                setTransactions(null);
            }
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
            setTransactions(null);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, [selectedMonth, selectedYear]);

    const labels = [...new Set(transactions?.map((trans) => trans.transaction_date))] || [];
    
    const spendingData = labels.map((label) => {
        const transaction = transactions?.find((trans) => trans.transaction_date === label && trans.type === 'spending');
        return transaction ? transaction.amount : null;
    });

    const earningData = labels.map((label) => {
        const transaction = transactions?.find((trans) => trans.transaction_date === label && trans.type === 'earning');
        return transaction ? transaction.amount : null;
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Pemasukan',
                data: earningData,
                borderColor: '#605BFF',
                backgroundColor: 'rgba(96, 91, 255, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                spanGaps: true, 
            },
            {
                label: 'Pengeluaran',
                data: spendingData,
                borderColor: '#FCD261',
                backgroundColor: 'rgba(252, 210, 97, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2,
                pointRadius: 3,
                spanGaps: true, 
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        const date = context[0].label; 
                        return `Tanggal ${date.split('/')[0]}`; 
                    },
                    label: (context) => `Rp. ${context.raw}`, 
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#9e9e9e' },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#e0e0e0', borderDash: [5, 5] },
                ticks: { color: '#9e9e9e', callback: (value) => `Rp. ${value}` },
            },
        },
    };

    return (
        <Card className="shadow p-3 mb-4 border-0 rounded-4 overview-laporan">
            <Card.Body className="d-flex flex-column" style={{ minHeight: '350px', height: '100%' }}>
                <Row className="mb-3 align-items-center">
                    <Col><Card.Title className="fs-5"><strong>Laporan Keuangan</strong></Card.Title></Col>
                    <Col className="text-end d-flex align-items-center justify-content-end">
                        <Dropdown as={ButtonGroup} className="me-2">
                            <Dropdown.Toggle variant="light" className="shadow-none border-0">
                                {selectedMonth}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {Object.keys(monthMapping).map((month) => (
                                    <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                                        {month}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="light" className="shadow-none border-0">
                                {selectedYear}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {[2024, 2025, 2026].map((year) => (
                                    <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                                        {year}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>
                <div style={{ width: '100%', height: '320px', overflowX: 'auto' }}>
                    <Line data={data} options={options} />
                </div>
            </Card.Body>
        </Card>

    );
};

export default OverviewLaporanUang;
