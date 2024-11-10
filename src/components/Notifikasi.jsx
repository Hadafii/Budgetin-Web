import React from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import '../Component Style/Notifikasi.css';

const NotificationPopover = () => {
  const popover = (
    <Popover id="popover-notification" className="shadow" style={{ minWidth: '300px' }}>
      <Popover.Header as="h3" className="d-flex justify-content-between align-items-center">
        <span>Notifications</span>
      </Popover.Header>
      <Popover.Body>
        <div className="notification-item">
          <strong>Selamat Datang Kembali!</strong>
          <p>Senang bertemu kembali dengan kamu. Yuk lanjutkan transaksi di Budgetin!</p>
          <small>17 Nov 2024</small>
        </div>
        <hr />
        <div className="notification-item">
          <strong>Password berhasil diganti!</strong>
          <p>Password kamu di budgetin udah berhasil diganti.</p>
          <small>17 Sep 2024</small>
        </div>
      </Popover.Body>
      <div className="text-center py-2">
        <Button variant="link" className="text-danger text-decoration-none" href="/Notification">View all notifications</Button>
      </div>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose>
      <Button variant="outline-light" className="navbar-button" id='notifaja'> 
        <i className="bi bi-bell-fill"></i>
      </Button>
    </OverlayTrigger>
  );
};

export default NotificationPopover;
