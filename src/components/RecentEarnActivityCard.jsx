import React from 'react';
import { Card } from 'react-bootstrap';

const RecentEarnActivityCard = ({ totalEarnings = 0 }) => {
    return (
        <Card className="shadow mb-4">
            <Card.Body className="text-center">
                <h5>Total Pemasukan (Bulan Ini)</h5>
                <h3 className="text-success">
                    Rp. 
                </h3>
            </Card.Body>
        </Card>
    );
};

export default RecentEarnActivityCard;
