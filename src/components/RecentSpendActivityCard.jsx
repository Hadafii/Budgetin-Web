import React from 'react';
import { Card } from 'react-bootstrap';

const RecentSpendActivityCard = ({ totalSpendings = 0 }) => {
    return (
        <Card className="shadow mb-4">
            <Card.Body className="text-center">
                <h5>Total Pengeluaran (Bulan Ini)</h5>
                <h3 className="text-danger">
                    Rp. 
                </h3>
            </Card.Body>
        </Card>
    );
};

export default RecentSpendActivityCard;
