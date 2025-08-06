import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaReceipt } from 'react-icons/fa';

const ActivityComponent = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ Get token from storage

        const res = await axios.get('https://final-project-2-ie9y.onrender.com/api/users/activity', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Add Authorization header
          },
        });

        // Handle response correctly
        if (res.data) {
          setActivities([res.data]); // res.data is a single object, so wrap in array
        } else {
          setActivities([]); // No activity found
        }
      } catch (err) {
        console.error('Error fetching activities:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div className="container py-5 text-center bg-white">
      <div className="mb-3">
        <FaReceipt size={40} className="text-secondary mb-2" />
        <h2 className="fw-bold">Your Recent Activity</h2>
        <div className="mx-auto mb-3" style={{ width: '60px', borderBottom: '2px solid #ccc' }}></div>
      </div>

      {loading ? (
        <p className="text-muted">Loading activity...</p>
      ) : activities.length === 0 ? (
        <p className="text-muted">No recent activity found.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>You</strong> {activity.action}
              </span>
              <small className="text-muted">
                {new Date(activity.timestamp).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityComponent;
