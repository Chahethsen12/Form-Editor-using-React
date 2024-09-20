import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EndScreen.css";

const EndScreen = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Thank you");
  const [description, setDescription] = useState(
    "This is a description of the form end"
  );

  const handleSave = () => {
    const confirmed = window.confirm("Do you want to save the changes?");
    if (confirmed) {
      alert("Form Saved!");
      setTimeout(() => {
        navigate(-1); // Navigate back to the previous page
      }, 2000); // Wait for 2 seconds
    }
  };

  const handleDiscard = () => {
    const confirmed = window.confirm(
      "Are you sure you want to discard changes?"
    );
    if (confirmed) {
      navigate("/"); // Navigate to the home page
    }
  };

  return (
    <div className="app-container">
      <div className="settings-panel">
        <b>
          <h3>Settings</h3>
        </b>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="discard-btn" onClick={handleDiscard}>
            Discard
          </button>
        </div>
      </div>
      <div className="preview-panel">
        <div className="preview-content">
          <h1>{title}</h1>
          <p>{description}</p> {/* Ensure this is properly rendered */}
        </div>
      </div>
    </div>
  );
};

export default EndScreen;
