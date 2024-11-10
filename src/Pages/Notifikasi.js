import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Page from '../components/Page';

function Notifikasi({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  const notifications = [
    {
      title: "Selamat Datang Kembali!",
      message: "Senang bertemu kembali dengan kamu. Yuk lanjutkan transaksi di Budgetin!",
      date: "16 Nov 2024"
    },
    {
      title: "Password berhasil diganti!",
      message: "Password kamu di budgetin udah berhasil diganti.",
      date: "10 Okt 2024"
    },
    {
      title: "Update Terbaru Budgetin!",
      message: "Nikmati akses yang lebih cepat dan mudah untuk mengatur keuanganmu!",
      date: "17 Sep 2024"
    },
    {
      title: "Akses Siap!",
      message: "Aplikasi Budgetin kamu sekarang lebih mudah diakses.",
      date: "13 Jul 2024"
    },
    {
      title: "Akses Siap!",
      message: "Aplikasi Budgetin kamu sekarang lebih mudah diakses.",
      date: "13 Jul 2024"
    },
    {
      title: "Akses Siap!",
      message: "Aplikasi Budgetin kamu sekarang lebih mudah diakses.",
      date: "13 Jul 2024"
    },
  ];

  return (
    <Page 
      collapsed={collapsed} 
      toggleSidebar={toggleSidebar} 
      showOffcanvas={showOffcanvas}
      handleShowOffcanvas={handleShowOffcanvas}
      handleCloseOffcanvas={handleCloseOffcanvas}
    >
      <h3>Notifikasi</h3>
      {notifications.map((notif, index) => (
        <Card key={index} className="notification-card mb-3">
          <Card.Body>
            <Card.Title className="notification-title">{notif.title}</Card.Title>
            <Card.Text className="notification-message">{notif.message}</Card.Text>
            <Card.Text className="notification-date text-muted">{notif.date}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Page>

  );
}

export default Notifikasi;
