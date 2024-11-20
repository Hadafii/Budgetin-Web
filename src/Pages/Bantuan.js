import React from 'react';
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
                  <a href="/Dashboard"><b>Budgetin</b></a> akan membantu mengatur dan melacak keuangan penggunanya. Tujuannya adalah untuk membantu pengguna mengelola pengeluaran, menentukan anggaran, dan mengidentifikasi pengeluaran. Budgetin digunakan untuk mencatat semua transaksi agar mempermudah pengelolaan keuangan. Fitur-fitur utama Budgetin meliputi Manajemen Akun Pengguna, Pencatatan Transaksi Keuangan, Perencanaan dan Pemantauan Anggaran, Identifikasi Pengeluaran, Pelaporan Keuangan, dan Notifikasi.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Bagaimana Cara Mengubah Password?</Accordion.Header>
                <Accordion.Body>
                  Password dapat diubah pada Menu <a href="/Profile"><b>Profil</b></a> dengan mengisi kata sandi saat ini pada card 'Ubah Kata Sandi'. Kemudian isi kata sandi baru, untuk memastikan kata sandi yang baru diinputkan benar, dapat mengkonfirmasi kembali kata sandi yang baru, yang akan dicocokan dengan kata sandi baru. <br />
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Bagaimana Jika Saya Lupa Password Saya?</Accordion.Header>
                <Accordion.Body>
                  Jika anda lupa password anda, anda dapat masuk ke halaman <a href="/ForgotPassword"><b>ForgotPassword</b></a>. Anda akan diminta untuk input alamat email anda untuk dikirimkan link reset password. Anda dapat membuat password baru dan mengkonfirmasi password tersebut kembali.<br />
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Bagaimana Cara Menambahkan Transaksi Baru?</Accordion.Header>
                <Accordion.Body>
                  Untuk menambahkan transaksi baru, buka halaman <a href="/Dashboard"><b>Dashboard</b></a>. Pilih tombol pemasukan ataupun tombol pengeluaran sesuai kebutuhan. Isi detail transaksi sesuai dengan ketentuan. Setelah itu, simpan transaksi untuk melacaknya di <a href="/Laporan"><b>Laporan Keuangan</b></a> Anda atau halaman <a href="/Dashboard"><b>Dashboard</b></a>.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Mengapa Card Sisa Budget Tidak Menampilkan Kategori Lain?</Accordion.Header>
                <Accordion.Body>
                  Card 'Sisa Budget' hanya menampilkan kategori <b>Food & Beverage</b>, <b>Shopping</b>, dan <b>Other</b>. Kategori <b>Other</b> akan menjumlahkan semua budget dan akan menjumlahkan pengeluaran yang telah dilakukan dari kategori selain <b>Food & Beverage</b> dan <b>Shopping</b>. Hal ini dilakukan agar tidak terlalu padat di halaman <a href="/Dashboard"><b>Dashboard</b></a>. Jika pengguna ingin melihat secara detail, pengguna dapat klik 'Lihat Semua' pada Card 'Sisa Budget' atau pengguna dapat langsung melihatnya pada Card 'Budget Process' di halaman <a href="/Rencana"><b>Rencana Anggaran</b></a>.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Apa yang Dimaksud dengan Rencana Anggaran?</Accordion.Header>
                <Accordion.Body>
                  <a href="/Rencana"><b>Rencana Anggaran</b></a> adalah fitur yang memungkinkan pengguna untuk menetapkan batas anggaran setiap bulannya pada kategori tertentu, seperti makanan dan minuman, biaya admin, belanja, dan lain-lain. 
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="6">
                <Accordion.Header>Bagaimana Cara Melihat Laporan Keuangan?</Accordion.Header>
                <Accordion.Body>
                  Pengguna dapat melihat laporan secara sekilas pada halaman <a href="/Dashboard"><b>Dashboard</b></a>. Untuk lebih detail, pengguna dapat melihat laporan keuangan pada halaman <a href="/laporan"><b>Laporan Keuangan</b></a>.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Bagaimana Cara Input Balance Pertama Kali?</Accordion.Header>
                <Accordion.Body>
                  Pengguna dapat memasukkan balance saldo pertama mereka dengan menginputkannya pada halaman <a href="/Pendapatan"><b>Pendapatan</b></a>. Selanjutnya, jumlah balance akan terus di<i>update</i> dari pengeluaran yang dilakukan dan pemasukan yang dididapatkan.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="8">
                <Accordion.Header>Apakah Data Saya Aman di Budgetin?</Accordion.Header>
                <Accordion.Body>
                  Ya, <a href="/Dashboard"><b>Budgetin</b></a> menjaga keamanan data Anda dengan teknologi enkripsi untuk melindungi password pengguna. Kami juga tidak membagikan data pengguna kepada pihak ketiga tanpa izin. Jika ada yang berusaha mendapatkan akun Anda dengan cara forgot password, hal ini tidak akan dapat terjadi karena ada verifikasi email.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div>
              <Accordion.Item eventKey="9">
                <Accordion.Header>Butuh Bantuan Lebih Lanjut?</Accordion.Header>
                <Accordion.Body>
                  Anda dapat menghubungi customer service kami melalui email <a href="mailto:budgetinmailer@gmail.com"> budgetinmailer@gmail.com</a>.
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </Accordion>
  </Page>
  );
}

export default Bantuan;
