import React from "react";
import { Link } from "react-router-dom";
import logo404 from "../Assets/404.svg";

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center login-container">
      <img src={logo404} alt="404 Not Found" className="img-fluid" style={{ maxWidth: "400px" }} />
      <h1 className="display-4 mt-4">Oops! Halaman Tidak Ditemukan</h1>
      <p className="text-muted mb-4">
        Sepertinya halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2 budgetin-custom-button-2">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
