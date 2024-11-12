import React from 'react';
import { Container, Navbar, Nav, Button, Card, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';
import BudgetinLogo from '../Assets/Budgetinsvg-white.svg';
import BudgetinLandingImg from '../Assets/budgetin-landing.svg';
import UserAccountManagementImg from '../Assets/User-Account-Management.svg';
import BudgetAlertsImg from '../Assets/Budget-Alerts.svg';
import ExpenseIdentificationImg from '../Assets/Expense-Identification.svg';
import BudgetPlanningMonitoringImg from '../Assets/Budget-Planning&Monitoring.svg';
import FinancialTransactionTrackingImg from '../Assets/Financial-Transaction-Tracking.svg';
import FinancialReportingImg from '../Assets/financial-reporting.svg';


const LandingPage = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar sticky="top" style={{ backgroundColor: '#15B7B9' }} variant="dark" expand="md" className="px-4 shadow-sm container-fluid py-0">
        <Navbar.Brand href="#" className="d-flex align-items-center pb-2">
          <img src={BudgetinLogo} alt="Budgetin Logo" width="130" height="40" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#features" className="text-light mx-2">Features</Nav.Link>
            <Nav.Link href="#about" className="text-light mx-2">About</Nav.Link>
            <Nav.Link href="#contact" className="text-light mx-2">Contact</Nav.Link>
          </Nav>
          <Button variant="light" href="/login" className="ms-3">Login</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Header Section */}
      <section className="header-section text-light py-5" style={{ backgroundColor: '#15B7B9' }}>
        <Container>
          <Row className="align-items-center">
            {/* Text Section */}
            <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
              <h1>Welcome to Budgetin</h1>
              <p className="lead">Manage your finances effortlessly with Budgetin. Track expenses, set budgets, and more.</p>
              <Button variant="light" size="lg" href="/Signin">
            Get Started
          </Button>
            </Col>
            {/* Image Section */}
            <Col md={6} className="text-center d-none d-md-block">
              <img src={BudgetinLandingImg} alt="Welcome to Budgetin" style={{ maxWidth: '70%', height: 'auto' }} />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section with Swiper */}
      <section id="features" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Key Features</h2>
          <Swiper
            modules={[Autoplay, Scrollbar]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            scrollbar={{ draggable: true }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={UserAccountManagementImg} alt="User Account Management" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>User Account Management</Card.Title>
                  <Card.Text>
                    Manage and customize your account for a personalized budgeting experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={FinancialTransactionTrackingImg} alt="Financial Transaction Tracking" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>Financial Transaction Tracking</Card.Title>
                  <Card.Text>
                    Keep a record of every transaction to understand where your money goes.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={BudgetPlanningMonitoringImg} alt="Budget Planning & Monitoring" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>Budget Planning & Monitoring</Card.Title>
                  <Card.Text>
                    Set and monitor your budget to keep your finances on track.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={ExpenseIdentificationImg} alt="Expense Identification" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>Expense Identification</Card.Title>
                  <Card.Text>
                    Identify high spending categories and adjust your habits accordingly.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={FinancialReportingImg} alt="Financial Reporting" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>Financial Reporting</Card.Title>
                  <Card.Text>
                    Generate detailed reports to gain insights into your financial health.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
            <SwiperSlide>
              <Card className="h-100 border-0 shadow text-center p-4" style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Card.Img variant="top" src={BudgetAlertsImg} alt="Budget Alerts" style={{ width: '100px', margin: '0 auto' }} />
                <Card.Body>
                  <Card.Title>Budget Alerts</Card.Title>
                  <Card.Text>
                    Get notified when you're close to exceeding your budget limits.
                  </Card.Text>
                </Card.Body>
              </Card>
            </SwiperSlide>
          </Swiper>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <Container className="text-center">
          <h2>About Budgetin</h2>
          <p className="lead mt-3">
            Budgetin helps you manage and track your finances effectively. Our goal is to empower users
            to manage expenses, set budgets, and gain insights into spending patterns.
          </p>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 bg-light">
        <Container className="text-center">
          <h2>Contact Us</h2>
          <p className="lead">Have questions? Reach out to us for support or more information.</p>
          <Button variant="dark" href="mailto:support@budgetin.com" >
            Contact Support
          </Button>
        </Container>
      </section>

      {/* Footer */}
      <footer className="text-center text-light py-4" style={{ backgroundColor: '#15B7B9' }}>
        <Container>
          <p className="mb-0">&copy; 2024 Budgetin. All rights reserved.</p>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;
