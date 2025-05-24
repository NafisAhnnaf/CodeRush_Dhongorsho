import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const backend = import.meta.env.VITE_BACKEND;

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${backend}/user/${id}`);
        setUserData(res.data);
        setEditableData(res.data);
      } catch (err) {
        alert("Failed to fetch user data");
      }
    };
    fetchUserData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`${backend}/user/${id}`, editableData);
      alert("Profile updated successfully");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.photo || "https://via.placeholder.com/150"}
          alt="User"
          className="profile-pic"
        />
        <h2>{userData.name}</h2>
      </div>

      <div className="profile-info">
        {Object.keys(userData).map((key) => {
          if (key === "password" || key === "photo" || key === "id") return null;
          return (
            <div key={key} className="profile-field">
              <label>{key}:</label>
              <input
                type="text"
                value={editableData[key] || ""}
                onChange={(e) =>
                  setEditableData({ ...editableData, [key]: e.target.value })
                }
              />
            </div>
          );
        })}
        <button onClick={handleUpdate} className="update-btn">Update Info</button>
      </div>
    </div>
  );
}

export default Profile;

