import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Row, Col, Badge } from 'react-bootstrap';
import '../../Component Style/TransaksiTerbaru.css';

const getCategoryIcon = (category_id, type) => {
    if (type === 'spending') {
        switch (category_id) {
            case 1: return <i className="bi bi-egg-fried text-secondary fs-4"></i>; 
            case 2: return <i className="bi bi-bag-fill text-secondary fs-4"></i>; 
            case 3: return <i className="bi bi-arrow-left-right text-secondary fs-4"></i>; 
            case 4: return <i className="bi bi-basket text-secondary fs-4"></i>; 
            case 5: return <i className="bi bi-cash-stack text-secondary fs-4"></i>; 
            case 6: return <i className="bi bi-heart-fill text-secondary fs-4"></i>; 
            case 7: return <i className="bi bi-gift text-secondary fs-4"></i>; 
            case 8: return <i className="bi bi-film text-secondary fs-4"></i>; 
            case 9: return <i className="bi bi-currency-exchange text-secondary fs-4"></i>;
            case 10: return <i className="bi bi-heart-pulse text-secondary fs-4"></i>; 
            case 11: return <i className="bi bi-clipboard text-secondary fs-4"></i>; 
            case 12: return <i className="bi bi-compass text-secondary fs-4"></i>; 
            case 13: return <i className="bi bi-file-earmark-text text-secondary fs-4"></i>; 
            case 14: return <i className="bi bi-credit-card text-secondary fs-4"></i>; 
            case 15: return <i className="bi bi-book text-secondary fs-4"></i>; 
            case 16: return <i className="bi bi-briefcase text-secondary fs-4"></i>; 
            case 17: return <i className="bi bi-house text-secondary fs-4"></i>; 
            case 18: return <i className="bi bi-lightbulb text-secondary fs-4"></i>; 
            case 19: return <i className="bi bi-truck text-secondary fs-4"></i>; 
            case 20: return <i className="bi bi-wallet2 text-secondary fs-4"></i>; 
            case 21: return <i className="bi bi-three-dots text-secondary fs-4"></i>; 
            default: return <i className="bi bi-question-circle text-secondary fs-4"></i>; 
        }
    } else if (type === 'earning') {
        switch (category_id) {
            case 1: return <i className="bi bi-cash text-secondary fs-4"></i>; 
            case 2: return <i className="bi bi-award text-secondary fs-4"></i>; 
            case 3: return <i className="bi bi-cash-coin text-secondary fs-4"></i>; 
            case 4: return <i className="bi bi-clipboard-check text-secondary fs-4"></i>; 
            case 5: return <i className="bi bi-piggy-bank text-secondary fs-4"></i>; 
            case 6: return <i className="bi bi-arrow-left-right text-secondary fs-4"></i>; 
            default: return <i className="bi bi-question-circle text-secondary fs-4"></i>; 
        }
    }
};

const TransaksiTerbaru = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch('https://api.dafiutomo.com/GatewayApi/v1/getUserLatestTransactions', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                if (result.success) {
                    setTransactions(result.data);
                } else {
                    console.error("Failed to fetch transactions:", result.message);
                }
            } catch (error) {
                console.error("Failed to fetch transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const formatAmount = (amount) => {
        if (amount >= 1000000) {
            return `Rp. ${(amount / 1000000).toFixed(0)}jt`;
        } else if (amount >= 1000) {
            return `Rp. ${(amount / 1000).toFixed(0)}rb`;
        }
        return `Rp. ${amount}`;
    };

    return (
        <Card className="shadow p-3 mb-4 border-0 rounded-4">
            <Card.Body>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <Card.Title className="text-truncate" style={{ whiteSpace: 'nowrap' }}>
                            <strong>Transaksi Terbaru</strong>
                        </Card.Title>
                    </Col>
                    <Col className="text-end">
                        <a href="/Laporan" className='budgetin-linked'>Lihat Semua</a>
                    </Col>
                </Row>
                <hr />
                <ListGroup variant="flush">
                    {transactions.map((transaction) => (
                        <ListGroup.Item key={transaction.transaction_id} className="d-flex justify-content-between align-items-center border-0 px-0">
                            <Row className="align-items-center w-100">
                                <Col xs={2} className="text-center">        
                                    <div className="rounded-circle bg-light" style={{ width: 40, height: 40 }}>
                                        {getCategoryIcon(transaction.spending_category_id || transaction.earning_category_id, transaction.type)}
                                    </div>
                                </Col>
                                <Col xs={6}>
                                    <div className="fw-bold">{transaction.description}</div>
                                    <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                                        {new Date(transaction.transaction_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </Col>
                                <Col xs={4} className="text-end">
                                    <div className="fw-bold">{formatAmount(transaction.amount)}</div>
                                    <Badge
                                        className={`badge-custom ${transaction.type === 'spending' ? 'badge-spending' : 'badge-earning'}`}
                                    >
                                        {transaction.type === 'spending' ? 'Spending' : 'Earning'}
                                    </Badge>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>

    );
};

export default TransaksiTerbaru;
