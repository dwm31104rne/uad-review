import React, { useState, useEffect } from 'react';
import ActivityCard from '../components/ActivityCard';

function Admin() {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    date: ''
  });
  const [editActivity, setEditActivity] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/activities')
      .then((response) => response.json())
      .then((data) => setActivities(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddActivity = () => {
    fetch('http://localhost:5000/api/activities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newActivity),
    })
      .then((response) => response.json())
      .then((newActivity) => {
        setActivities((prev) => [...prev, newActivity]);
        setNewActivity({ name: '', description: '', date: '' });
      })
      .catch((error) => console.error('Error adding activity:', error));
  };

  const handleDeleteActivity = (id) => {
    fetch(`http://localhost:5000/api/activities/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setActivities((prev) => prev.filter((activity) => activity.id !== id));
      })
      .catch((error) => console.error('Error deleting activity:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin - Manage Activities</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Add New Activity</h2>
        <input
          type="text"
          name="name"
          placeholder="Activity Name"
          value={newActivity.name}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Activity Description"
          value={newActivity.description}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-2 w-full"
        />
        <input
          type="date"
          name="date"
          value={newActivity.date}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 mb-2 w-full"
        />
        <button
          onClick={handleAddActivity}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Activity
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Activity List</h2>
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onDelete={handleDeleteActivity}
            />
          ))
        ) : (
          <p>No activities available</p>
        )}
      </div>
    </div>
  );
}

export default Admin;
