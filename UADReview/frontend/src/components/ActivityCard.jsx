import React from 'react';

function ActivityCard({ activity, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <h3 className="text-xl font-bold">{activity.name}</h3>
      <p>{activity.description}</p>
      <p className="text-sm text-gray-500">Date: {activity.date}</p>
      <button
        onClick={() => onDelete(activity.id)}
        className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

export default ActivityCard;
