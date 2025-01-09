import React, { useState } from 'react';

function ReviewForm({ onSubmit }) {
  const [review, setReview] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.title || !review.content) {
      setError('Judul dan konten ulasan wajib diisi');
      return;
    }
    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ activityId, title: review.title, content: review.content }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Review saved:', data);
        setReview({ title: '', content: '' }); // Reset form setelah ulasan berhasil disimpan
      })
      .catch((err) => console.error('Error saving review:', err));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          value={review.title}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      <div>
        <textarea
          name="content"
          placeholder="Write your review..."
          value={review.content}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;
