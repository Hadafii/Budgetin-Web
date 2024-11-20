import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Badge, Nav, Dropdown, ButtonGroup } from 'react-bootstrap';

const RecentActivity = () => {
  const [filter, setFilter] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('All Months');
  const [selectedYear, setSelectedYear] = useState('All Years');

  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December'
  ];

  const years = ['2020', '2021', '2022', '2023'];

  const transactions = [
    {
      date: '2020-09-13',
      data: [
        {
          id: 1,
          icon: 'bi-arrow-left-right',
          title: 'Amazon Support',
          category: 'Supplies',
          type: 'Earning',
          amount: '+$10,100.00',
          time: '2020-09-13',
          categoryColor: 'warning',
          typeColor: 'success',
        },
      ],
    },
    {
      date: '2020-09-10',
      data: [
        {
          id: 2,
          icon: 'bi-building',
          title: 'Roland GmbH',
          category: 'Marketing',
          type: 'Spending',
          amount: '-$50,400.00',
          time: '2020-09-10',
          categoryColor: 'info',
          typeColor: 'danger',
        },
        {
          id: 3,
          icon: 'bi-arrow-left-right',
          title: 'Bank of America',
          category: 'Office supplies',
          type: 'Spending',
          amount: '-$10,100.00',
          time: '2020-09-10',
          categoryColor: 'primary',
          typeColor: 'danger',
        },
      ],
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const filteredTransactions = transactions.map((day) => ({
    ...day,
    data: day.data.filter((transaction) => {
      const transactionDate = new Date(transaction.time);
      const monthMatch =
        selectedMonth === 'All Months' ||
        months[transactionDate.getMonth()] === selectedMonth;
      const yearMatch =
        selectedYear === 'All Years' ||
        transactionDate.getFullYear().toString() === selectedYear;
      const typeMatch = filter === 'all' || transaction.type.toLowerCase() === filter;

      return monthMatch && yearMatch && typeMatch;
    }),
  }));

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Recent Activity</h2>
        </Col>
      </Row>
      <Row className="align-items-center mb-3">
        <Col xs={12} md={8} className="mb-2 mb-md-0">
          <Nav variant="tabs" defaultActiveKey="all" className="w-100">
            <Nav.Item>
              <Nav.Link eventKey="all" onClick={() => setFilter('all')}>
                All History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="earning" onClick={() => setFilter('earning')}>
                Earning History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="spending" onClick={() => setFilter('spending')}>
                Spending History
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end flex-column flex-md-row">
          <Dropdown as={ButtonGroup} className="mb-2 mb-md-0 me-md-2">
            <Dropdown.Toggle variant="outline-primary">{selectedMonth}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedMonth('All Months')}>All Months</Dropdown.Item>
              {months.map((month) => (
                <Dropdown.Item key={month} onClick={() => setSelectedMonth(month)}>
                  {month}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle variant="outline-primary">{selectedYear}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSelectedYear('All Years')}>All Years</Dropdown.Item>
              {years.map((year) => (
                <Dropdown.Item key={year} onClick={() => setSelectedYear(year)}>
                  {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
          {filteredTransactions.map((day) =>
            day.data.length > 0 ? (
              <div key={day.date} className="mb-4">
                <h6 className="text-muted">{formatDate(day.date)}</h6>
                <ListGroup variant="flush">
                  {day.data.map((transaction) => (
                    <ListGroup.Item
                    key={transaction.id}
                    className="d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <Row className="align-items-center w-100">
                      <Col xs={1} md={1} className="text-center">
                        <i className={`bi ${transaction.icon} fs-4 text-secondary`}></i>
                      </Col>
                      <Col xs={4} md={3}>
                        <div className="fw-bold">{transaction.title}</div>
                      </Col>
                      <Col xs={5} md={3} className="text-center text-md-start">
                        <div className="text-muted">{formatDate(transaction.time)}</div>
                      </Col>
                      <Col xs={12} md={2} className="text-center d-none d-md-block">
                        <Badge bg={transaction.categoryColor} className="text-capitalize">
                          {transaction.category}
                        </Badge>
                      </Col>
                      <Col xs={12} md={2} className="text-center d-none d-md-block">
                        <Badge bg={transaction.typeColor} className="text-capitalize">
                          {transaction.type}
                        </Badge>
                      </Col>
                      <Col xs={2} md={1} className="text-end fw-bold">
                        {transaction.amount}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  
                  ))}
                </ListGroup>
              </div>
            ) : null
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default RecentActivity;
