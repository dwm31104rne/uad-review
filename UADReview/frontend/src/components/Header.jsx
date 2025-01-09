import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Gambar logo

function Header() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4" style={{ backgroundColor: "#FFEFD5", color: "#ff7f50" }}>
      <div className="flex items-center">
        <img src={logo} alt="Logo UADReview" className="w-15 h-20 mr-2" />
      </div>
      <nav className="space-x-6">
        <Link to="/" className="font-poppins font-semibold tracking-wide hover:underline">Beranda</Link>
        <Link to="/account" className="font-poppins font-semibold tracking-wide hover:underline">Akun</Link>
        <Link to="/reviews" className="font-poppins font-semibold tracking-wide hover:underline">Ulasan</Link>
        <Link to="/settings" className="font-poppins font-semibold tracking-wide hover:underline">Pengaturan</Link>
      </nav>
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </header>
  );
}

export default Header;
