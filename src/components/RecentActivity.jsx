import React, { useState, useEffect,useCallback, useMemo   } from 'react';
import { Container, Row, Col, ListGroup, Badge, Nav, Dropdown, ButtonGroup, Card} from 'react-bootstrap';
import RecentActivityChart from './RecentActivityChart';

const getCategoryIcon = (category_id, type) => {
    if (type === 'spending') {
        switch (category_id) {
            case 1: return <i className="bi bi-egg-fried text-secondary fs-4"></i>; // Food & Beverage
            case 2: return <i className="bi bi-bag-fill text-secondary fs-4"></i>; // Shopping
            case 3: return <i className="bi bi-arrow-left-right text-secondary fs-4"></i>; // Account Transfer
            case 4: return <i className="bi bi-basket text-secondary fs-4"></i>; // Groceries
            case 5: return <i className="bi bi-cash-stack text-secondary fs-4"></i>; // Admin Fee
            case 6: return <i className="bi bi-heart-fill text-secondary fs-4"></i>; // Donation
            case 7: return <i className="bi bi-gift text-secondary fs-4"></i>; // Gift
            case 8: return <i className="bi bi-film text-secondary fs-4"></i>; // Entertainment
            case 9: return <i className="bi bi-currency-exchange text-secondary fs-4"></i>; // Investment
            case 10: return <i className="bi bi-heart-pulse text-secondary fs-4"></i>; // Health
            case 11: return <i className="bi bi-clipboard text-secondary fs-4"></i>; // Miscellaneous
            case 12: return <i className="bi bi-compass text-secondary fs-4"></i>; // Travel
            case 13: return <i className="bi bi-file-earmark-text text-secondary fs-4"></i>; // Tax
            case 14: return <i className="bi bi-credit-card text-secondary fs-4"></i>; // Payment
            case 15: return <i className="bi bi-book text-secondary fs-4"></i>; // Education
            case 16: return <i className="bi bi-briefcase text-secondary fs-4"></i>; // Business Expense
            case 17: return <i className="bi bi-house text-secondary fs-4"></i>; // Household Supplies
            case 18: return <i className="bi bi-lightbulb text-secondary fs-4"></i>; // Utilities
            case 19: return <i className="bi bi-truck text-secondary fs-4"></i>; // Transportation
            case 20: return <i className="bi bi-wallet2 text-secondary fs-4"></i>; // Cash
            case 21: return <i className="bi bi-three-dots text-secondary fs-4"></i>; // Other Category
            default: return <i className="bi bi-question-circle text-secondary fs-4"></i>; // Default
        }
    } else if (type === 'earning') {
        switch (category_id) {
            case 1: return <i className="bi bi-cash text-secondary fs-4"></i>; // Interest & Investment
            case 2: return <i className="bi bi-award text-secondary fs-4"></i>; // Cashback
            case 3: return <i className="bi bi-cash-coin text-secondary fs-4"></i>; // Salary
            case 4: return <i className="bi bi-clipboard-check text-secondary fs-4"></i>; // Miscellaneous
            case 5: return <i className="bi bi-piggy-bank text-secondary fs-4"></i>; // Cash Deposit
            case 6: return <i className="bi bi-arrow-left-right text-secondary fs-4"></i>; // Account Transfer
            default: return <i className="bi bi-question-circle text-secondary fs-4"></i>; // Default
        }
    }
};
const RecentActivity = () => {
    const months = useMemo(() => [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ], []);
    
    const years = ['2023', '2024', '2025', '2026', '2027', '2028'];

    const currentDate = new Date();
    const currentMonth = months[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear().toString();

    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedMonth, setSelectedMonth] = useState(currentMonth); 
    const [selectedYear, setSelectedYear] = useState(currentYear); 
    const [totalSpending, setTotalSpending] = useState(0); 
    const [totalEarning, setTotalEarning] = useState(0); 
    const [isLoading, setIsLoading] = useState(false);



    const categoryMapping = {
    earning: {
        1: "Investasi",
        2: "Cashback",
        3: "Gaji",
        4: "Miscellaneous",
        5: "Cash Deposit",
        6: "Transfer dari Akun"
    },
    spending: {
        1: "Makanan & Minuman",
        2: "Belanja",
        3: "Transfer",
        4: "Bahan Makanan",
        5: "Biaya Admin",
        6: "Donasi",
        7: "Hadiah",
        8: "Hiburan",
        9: "Investasi",
        10: "Kesehatan",
        11: "Miscellaneous",
        12: "Perjalanan",
        13: "Pajak",
        14: "Pembayaran",
        15: "Pendidikan",
        16: "Pengeluaran Usaha",
        17: "Perlengkapan Rumah Tangga",
        18: "Utilitas",
        19: "Transportasi",
        20: "Uang Tunai",
        21: "Kebutuhan Lainnya"
    }
    };


    const fetchTransactions = useCallback(async () => {
        const token = localStorage.getItem("token");
        const monthParam = months.indexOf(selectedMonth) + 1;
        const yearParam = selectedYear;
        const typeParam = filter === 'all' ? '' : filter;

        try {
            const response = await fetch(
                `https://api.dafiutomo.com/GatewayApi/v1/getRecentActivity?month=${monthParam}&year=${yearParam}&type=${typeParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const result = await response.json();
            if (result.success) {
                setTransactions(result.data);
            } else {
                console.error("Failed to fetch transactions:", result.message);
            }
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [selectedMonth, selectedYear, filter, months]);

    const fetchTransactionSummary = useCallback(async () => {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const monthParam = months.indexOf(selectedMonth) + 1; 
      const yearParam = selectedYear; 
  
      try {
          const response = await fetch(
              `https://api.dafiutomo.com/GatewayApi/v1/getTransactionsByMonth?month=${monthParam}&year=${yearParam}`,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          const result = await response.json();
          if (result.success) {
              const transactions = result.data;
              const totalSpending = transactions
                  .filter((transaction) => transaction.type === "spending")
                  .reduce((sum, transaction) => sum + transaction.amount, 0);
  
              const totalEarning = transactions
                  .filter((transaction) => transaction.type === "earning")
                  .reduce((sum, transaction) => sum + transaction.amount, 0);
  
              setTotalSpending(totalSpending);
              setTotalEarning(totalEarning);
          } else {
              console.error("Failed to fetch transactions:", result.message);
          }
      } catch (error) {
          console.error("Error fetching transactions:", error);
      } finally {
          setIsLoading(false); 
      }
  }, [selectedMonth, selectedYear, months]);
  

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    useEffect(() => {
      fetchTransactionSummary();
  }, [selectedMonth, selectedYear]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const getCategory = (type, categoryId) => {
    return categoryMapping[type]?.[categoryId] || "Tidak Diketahui";
  };


  return (
    <Container>
      
        <h2>History Transactions</h2>
        
      <Row>
        <Col>
            <RecentActivityChart selectedMonth={selectedMonth} selectedYear={selectedYear} />
        </Col>
    </Row>
    <Row className="mb-4">
        <Col md={6}>
            <Card className="shadow border-0">
                <Card.Body className="text-center">
                    <h5>Total Pengeluaran</h5>
                    {isLoading ? (
                        <h3 className="text-danger">Loading...</h3 > 
                    ) : (
                        <h3 className="text-danger">
                            Rp. {new Intl.NumberFormat('id-ID').format(totalSpending)}
                        </h3>
                    )}
                </Card.Body>
            </Card>
        </Col>
        <Col md={6}>
            <Card className="shadow border-0">
                <Card.Body className="text-center">
                    <h5>Total Pemasukan</h5>
                    {isLoading ? (
                        <h3 className="text-success">Loading...</h3> 
                    ) : (
                        <h3 className="text-success">
                            Rp. {new Intl.NumberFormat('id-ID').format(totalEarning)}
                        </h3>
                    )}
                </Card.Body>
            </Card>
        </Col>
    </Row>

      <Row className="align-items-center mb-3">
        <Col xs={12} md={8} className="mb-2 mb-md-0">
          <Nav  fill variant="tabs" defaultActiveKey="all" className="w-100">
            <Nav.Item>
              <Nav.Link className='navigasi' eventKey="all" onClick={() => setFilter('all')}>
                All History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='navigasi' eventKey="earning" onClick={() => setFilter('earning')}>
                Earn History
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className='navigasi' eventKey="spending" onClick={() => setFilter('spending')}>
                Spend History
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col xs={12} md={4} className="d-flex justify-content-md-end flex-column flex-md-row">
          <Dropdown as={ButtonGroup} className="mb-2 mb-md-0 me-md-2">
            <Dropdown.Toggle className='budgetin-custom-button-2'>{selectedMonth}</Dropdown.Toggle>
            <Dropdown.Menu>
              {months.map((month) => (
                <Dropdown.Item
                    key={month}
                    onClick={() => {
                        setSelectedMonth(month);
                        fetchTransactionSummary(); 
                    }}
                >
                    {month}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle className='budgetin-custom-button-2'>{selectedYear}</Dropdown.Toggle>
            <Dropdown.Menu >
              {years.map((year) => (
                <Dropdown.Item
                    key={year}
                    onClick={() => {
                        setSelectedYear(year);
                        fetchTransactionSummary(); 
                    }}
                >
                    {year}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
      <Row>
        <Col>
            <ListGroup variant="flush" className='overflow-auto' style={{ minHeight: '400px', maxHeight: '400px',padding: '0', margin: '0', }}>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <ListGroup.Item key={transaction.transaction_id} className="d-flex justify-content-between align-items-center flex-wrap p-0 m-0 py-2" style={{width:'100%'}}>
                            <div className="row align-items-center p-0 m-0"style={{width:'100%'}}>
                            {/* Icon */}
                            <div className="col-1 col-sm-1 col-md-1 text-center">
                                <div>{getCategoryIcon(transaction.spending_category_id || transaction.earning_category_id, transaction.type)}</div>
                            </div>
                            {/* Description */}
                            <div className="col-5 col-sm-5 col-md-2 text-start">
                                <div className="fw-bold">{transaction.description}</div>
                            </div>
                            {/* Date */}
                            <div className="col-4 col-sm-4 col-md-3 text-center">
                                <div className="text-muted">{formatDate(transaction.transaction_date)}</div>
                            </div>
                            {/* Category */}
                            <div className="col-12 col-sm-12 col-md-2 text-center d-none d-md-block">
                                <Badge bg="secondary" pill>
                                    {getCategory(transaction.type, transaction.spending_category_id || transaction.earning_category_id)}
                                </Badge>
                            </div>
                            {/* Type */}
                            <div className="col-12 col-sm-12 col-md-2 ps-5 text-center d-none d-md-block">
                                <Badge bg={transaction.type === 'earning' ? 'success' : 'danger'}>
                                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                </Badge>
                            </div>
                            {/* Amount */}
                            <div className="col-1 col-sm-2 col-md-2 text-end fw-bold">
                                Rp. {formatAmount(transaction.amount)}
                            </div>
                        </div>

                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="text-center text-muted">
                        Tidak ada data
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Col>
    </Row>
    </Container>
  );
};

export default RecentActivity;
