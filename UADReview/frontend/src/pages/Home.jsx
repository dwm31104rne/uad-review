import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/loginform'); // Arahkan ke halaman LoginForm
  };

  return (
    <div className="p-6 bg-gradient-to-r to-blue-800 via-white rounded-lg shadow-lg">
      <h1 className="text-7xl font-bold text-center mb-4 font-[Poppins]">
        <span className="text-gradient">W</span>
        <span className="text-gradient">e</span>
        <span className="text-gradient">l</span>
        <span className="text-gradient">c</span>
        <span className="text-gradient">o</span>
        <span className="text-gradient">m</span>
        <span className="text-gradient">e</span>
        <span className="text-gradient"> </span>
        <span className="text-gradient">t</span>
        <span className="text-gradient">o</span>
        <span className="text-gradient"> </span>
        <span className="text-gradient">U</span>
        <span className="text-gradient">A</span>
        <span className="text-gradient">D</span>
        <span className="text-gradient"> </span>
        <span className="text-gradient">R</span>
        <span className="text-gradient">e</span>
        <span className="text-gradient">v</span>
        <span className="text-gradient">i</span>
        <span className="text-gradient">e</span>
        <span className="text-gradient">w</span>
      </h1>
      <p className="text-2xl text-center mb-6 font-[Baloo]">
        Jangan Cuma Kuliah, Yuk Ikutan Seru-seruan Kampus!
      </p>
      <div className="flex justify-center mb-8">
        <button
          onClick={handleLogin}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          Masuk / Daftar
        </button>
      </div>
      <p className="text-center text-sm font-[Quicksand]">
        Temukan berbagai kegiatan kampus dan ulasan dari teman-teman.
      </p>
    </div>
  );
}

export default Home;
