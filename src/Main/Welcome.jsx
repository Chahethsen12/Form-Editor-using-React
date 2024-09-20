import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const WelcomeScreenField = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("Welcome to the Form!");
  const [description, setDescription] = useState("This is a description.");
  const [image, setImage] = useState(null);
  const [imagePlacement, setImagePlacement] = useState("center");
  const [buttonText, setButtonText] = useState("Save");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSubmit = () => {
    const confirmed = window.confirm("Do you want to save the changes?");
    if (confirmed) {
      alert("Form submitted!");
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
    <div className="welcome-screen">
      <div className="welcome-screen-form">
        <b>
          <h3>Settings</h3>
        </b>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <br />
          <br />
          {image && (
            <>
              <button onClick={handleRemoveImage}>Remove the Image</button>
              <br />
              <br />
              <div className="form-group">
                <label>Image Placement</label>
                <select
                  value={imagePlacement}
                  onChange={(e) => setImagePlacement(e.target.value)}
                >
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
                <br />
              </div>
            </>
          )}
        </div>

        {/* Buttons in the settings panel */}
        <div className="form-group">
          <button onClick={handleSubmit}>Save</button>
          <button
            className="discard-button"
            style={{ marginLeft: "10px" }}
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>

      <div className="welcome-screen-preview">
        <h1>{title}</h1>
        <p>{description}</p>
        <button>{buttonText}</button>
        {image && (
          <div
            style={{
              display: "flex",
              justifyContent:
                imagePlacement === "center"
                  ? "center"
                  : imagePlacement === "left"
                  ? "flex-start"
                  : "flex-end",
              width: "100%",
            }}
          >
            <img
              src={image}
              alt="Uploaded"
              style={{
                width: "200px",
                display: "block",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreenField;
