// Reviews.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Reviews() {
  const { activityId } = useParams();
  const [review, setReview] = useState({ title: '', content: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review.title || !review.content) {
      setError('Title and content are required');
      return;
    }
    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ activityId, ...review }),
    })
      .then((response) => response.json())
      .then(() => {
        setReview({ title: '', content: '' });
      })
      .catch((error) => console.error('Error submitting review:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Submit Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Review Title"
          value={review.title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="content"
          placeholder="Write your review..."
          value={review.content}
          onChange={(e) => setReview({ ...review, content: e.target.value })}
          className="w-full p-3 border border-gray-300 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Reviews;
