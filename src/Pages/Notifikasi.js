import React, { useState, useEffect } from 'react';
import { Card, Badge, Container, Button ,Toast ,ToastContainer ,Spinner } from "react-bootstrap";
import Page from '../components/Page';
import '../style/Notifikasi.css';

function Notifikasi({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/Login";
        return;
      }

      try {
        const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/getnotifications", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const result = await response.json();
        if (result.success) {
          setNotifications(result.data);
        } else {
          console.error('Error fetching notifications:', result.message);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false); 
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://api.dafiutomo.com/GatewayApi/v1/markAsRead/${notificationId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      if (result.success) {
        setNotifications((prev) =>
          prev.map((notif) =>
            notif.notification_id === notificationId
              ? { ...notif, is_read: 1 }
              : notif
          )
        );
      } else {
        console.error('Error marking notification as read:', result.message);
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://api.dafiutomo.com/GatewayApi/v1/markAllAsRead", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();
      if (result.success) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, is_read: 1 }))
        );
        setShowToast(true); 
      } else {
        console.error('Error marking all notifications as read:', result.message);
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  };

  return (
    <Page
      collapsed={collapsed}
      toggleSidebar={toggleSidebar}
      showOffcanvas={showOffcanvas}
      handleShowOffcanvas={handleShowOffcanvas}
      handleCloseOffcanvas={handleCloseOffcanvas}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>Notifikasi</h3>
          <Button className="budgetin-custom-button-2" onClick={markAllAsRead}>
            Tandai Semua Dibaca
          </Button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status" variant='info'>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : notifications.length === 0 ? (
          <p>Tidak ada notifikasi.</p>
        ) : (
          notifications.map((notif) => (
            <Card
              key={notif.notification_id}
              className={`notification-card mb-3 ${notif.is_read === 0 ? 'unread' : ''}`}
              onClick={() => markAsRead(notif.notification_id)}
            >
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="notification-title">
                    {notif.message}
                  </Card.Title>
                  {notif.is_read === 0 && (
                    <Badge bg="warning" text="dark">
                      Belum Dibaca
                    </Badge>
                  )}
                </div>
                <Card.Text className="notification-date text-muted">
                  {formatDate(notif.created_at)}
                </Card.Text>
              </Card.Body>
            </Card>
          ))
        )}
      </Container>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notifikasi</strong>
          </Toast.Header>
          <Toast.Body>Semua notifikasi telah ditandai sebagai dibaca.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Page>
  );
}

export default Notifikasi;
