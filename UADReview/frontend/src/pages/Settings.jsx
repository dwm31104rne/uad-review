import React, { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

function Settings() {
  // Menyimpan status mode gelap
  const [darkMode, setDarkMode] = useState(false);

  // Menangani perubahan mode gelap
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Menyimpan mode ke localStorage ketika tombol "Simpan Pengaturan" diklik
  const saveSettings = () => {
    // Simpan mode ke localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    // Terapkan perubahan langsung pada elemen body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  // Memuat mode dari localStorage saat aplikasi dimulai
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Mengubah kelas 'dark' di body sesuai dengan mode gelap
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark'); // Menambahkan kelas 'dark' ke body
    } else {
      document.body.classList.remove('dark'); // Menghapus kelas 'dark' dari body
    }
  }, [darkMode]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Pengaturan</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Preferensi Pengguna</h2>
        
        {/* Ikon Mode Gelap */}
        <div className="flex justify-between mb-4 items-center">
          <span>Mode Gelap</span>
          <button onClick={toggleDarkMode} className="text-xl">
            {darkMode ? (
              <MoonIcon className="w-6 h-6 text-yellow-500" />
            ) : (
              <SunIcon className="w-6 h-6 text-gray-500" />
            )}
          </button>
        </div>
        
        {/* Tombol untuk menyimpan pengaturan mode */}
        <button 
          onClick={saveSettings}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simpan Pengaturan
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Statistik</h2>
        <p>Total kegiatan yang terdaftar: 2</p>
        <p>Total ulasan: 2</p>
        <p>Total pengguna aktif: 1</p>
      </div>
    </div>
  );
}

export default Settings;
