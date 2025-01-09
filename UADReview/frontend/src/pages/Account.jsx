import React, { useState, useEffect } from 'react';

function Account() {
  const [user, setUser] = useState(null);
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    // Ambil data pengguna dari backend atau local storage
    const userData = {
      username: 'user123',
      email: 'user123@gmail.com',
      activities: [
        { id: 1, name: 'Workshop Programming' },
        { id: 2, name: 'Seminar Teknologi' }
      ]
    };
    setUser(userData);
  }, []);

  useEffect(() => {
    if (user) {
      fetch('http://localhost:5000/api/reviews', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => res.json())
        .then((data) => setUserReviews(data.filter((r) => r.userId === user.username)))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Akun Saya</h1>
      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold">Informasi Pengguna</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 className="text-xl font-semibold mb-2">Kegiatan yang Diulas</h2>
        <ul>
          {userReviews.map((review, index) => (
            <li key={index} className="mb-2">{review.activityName}: {review.comment}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Kegiatan Terdaftar</h2>
        <ul>
          {user.activities.map((activity) => (
            <li key={activity.id} className="mb-2">{activity.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Account;