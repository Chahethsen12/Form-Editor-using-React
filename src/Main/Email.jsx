import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Email.css";

const EmailField = () => {
  const navigate = useNavigate();

  // State to manage title, description, email, validation message, and required switch
  const [title, setTitle] = useState("Email Address");
  const [description, setDescription] = useState("Please enter your email.");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isRequired, setIsRequired] = useState(false); // State for the required switch

  // Email validation function
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // Handling email input and validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email and set error message if invalid
    if (!validateEmail(value)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = () => {
    const confirmed = window.confirm(
      "Are you sure you want to save your changes?"
    );
    if (confirmed) {
      // Implement the save logic here
      alert("Form submitted!");
      setTimeout(() => {
        navigate("/"); // Navigate to the home page after 2 seconds
      }, 2000);
    }
  };

  const handleDiscard = () => {
    const confirmed = window.confirm(
      "Are you sure you want to discard your changes?"
    );
    if (confirmed) {
      setTitle("Email Address");
      setDescription("Please enter your email.");
      setEmail("");
      setEmailError("");
      setIsRequired(false); // Reset the switch
      navigate("/"); // Navigate to the home page
    }
  };

  return (
    <div className="email-field">
      {/* Form fields for email settings */}
      <div className="email-field-form">
        <b>
          <h3 style={{ color: "Black" }}>Settings</h3>
        </b>

        {/* Title Input */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Required Field Toggle (Switch) */}
        <div className="form-group switch-container">
          <span className="switch-label">Required</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
            />
            <span className="slider"></span>
          </label>
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

      {/* Real-time Preview */}
      <div className="email-field-preview">
        <h1>
          {title} {isRequired && <span style={{ color: "red" }}>*</span>}
        </h1>
        <p>{description}</p>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required={isRequired} // Makes the input required if switch is on
          />
        </div>
        {emailError && <p style={{ color: "red" }}>{emailError}</p>}
      </div>
    </div>
  );
};

export default EmailField;
