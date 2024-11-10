import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import '../style/Bantuan.css';
import Page from '../components/Page';

function Bantuan({ collapsed, toggleSidebar, showOffcanvas, handleShowOffcanvas, handleCloseOffcanvas }) {
  return (
    <Page 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
        showOffcanvas={showOffcanvas}
        handleShowOffcanvas={handleShowOffcanvas}
        handleCloseOffcanvas={handleCloseOffcanvas}
    >
          <Accordion alwaysOpen className='container'>
            <div>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Apa itu Budgetin?</Accordion.Header>
                <Accordion.Body>
                  <a href="/Dashboard"><b>Budgetin</b></a> akan membantu mengatur dan melacak keuangan penggunanya. Tujuannya adalah untuk membantu pengguna mengelola pengeluaran, menentukan anggaran, dan mengidentifikasi pengeluaran. Budgetin digunakan untuk mencatat semua transaksi agar mempermudah pengelolaan keuangan. Fitur-fitur utama Budgetin meliputi Manajemen Akun Pengguna, Pencatatan Transaksi Keuangan, Perencanaan dan Pemantauan Anggaran, Identifikasi Pengeluaran, Pelaporan Keuangan, dan Peringatan Anggaran.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Bagaimana Cara Mengubah Username?</Accordion.Header>
                <Accordion.Body>
                  Username dapat diubah pada Menu <a href="/Profile"><b>Profil</b></a> dengan menekan tombol edit untuk mengubah username. <br />
                  <i>Catatan: Username dapat diubah selama <u>+</u> 14 hari setelah membuat akun atau setelah perubahan terakhir.</i>
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Bagaimana Cara Menambahkan Transaksi Baru?</Accordion.Header>
                <Accordion.Body>
                  Untuk menambahkan transaksi baru, buka halaman <a href="/Dashboard"><b>Dashboard</b></a>. Pilih tombol pemasukan ataupun tombol pengeluaran sesuai kebutuhan. Isi detail transaksi sesuai dengan ketentuan. Setelah itu, simpan transaksi untuk melacaknya di <a href="/Laporan"><b>Laporan Keuangan</b></a> Anda.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Apa yang Dimaksud dengan Rencana Anggaran?</Accordion.Header>
                <Accordion.Body>
                  <a href="/Rencana"><b>Rencana Anggaran</b></a> adalah fitur yang memungkinkan pengguna untuk menetapkan batas anggaran pada jenis rencana yang diinginkan pengguna (hari, bulan, atau tahun) pada kategori tertentu, seperti kebutuhan sehari-hari pengguna, estimasi pengeluaran tambahan, estimasi untuk dana darurat, dan dana yang ditabung. Pada Rencana Anggaran, pengguna dapat mengunduh Rencana Anggaran, baik dalam bentuk pdf atau xls. 
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Bagaimana Cara Melihat Laporan Keuangan?</Accordion.Header>
                <Accordion.Body>
                  Pengguna dapat melihat laporan keuangan pada halaman <a href="/laporan"><b>Laporan Keuangan</b></a>, yang memberikan gambaran mengenai pemasukan, pengeluaran, dan sisa saldo secara detail.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Apakah Data Saya Aman di Budgetin?</Accordion.Header>
                <Accordion.Body>
                  Ya, <a href="/Dashboard"><b>Budgetin</b></a> menjaga keamanan data Anda dengan teknologi enkripsi untuk melindungi informasi keuangan dan akun pengguna. Kami juga tidak membagikan data pengguna kepada pihak ketiga tanpa izin.
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
  </Page>
  );
}

export default Bantuan;
