import React, { useState } from 'react';

function RegisterForm() {
  const [form, setForm] = useState({ username: '', password: '', role: 'user', accessCode: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
        return res.text();
      })
      .then((data) => {
        setSuccess(data);
        setError('');
      })
      .catch((err) => {
        setError(err.message);
        setSuccess('');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded"
      />
      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded"
      >
        <option value="user">Pengguna</option>
        <option value="admin">Admin</option>
      </select>
      {form.role === 'admin' && (
        <input
          type="text"
          name="accessCode"
          placeholder="Kode Akses Admin"
          value={form.accessCode}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
      )}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
        Daftar
      </button>
    </form>
  );
}

export default RegisterForm;