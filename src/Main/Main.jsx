import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Main.css";

const FormEditor = () => {
  const navigate = useNavigate();
  const [steps, setSteps] = useState([
    { id: 1, label: "Welcome screen" },
    { id: 2, label: "End screen" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState("");
  const [lastDeletedStep, setLastDeletedStep] = useState(null);
  const [activeTab, setActiveTab] = useState("Content"); // Track active tab
  const fieldOptions = ["Email Address", "Text Field", "Checkbox", "Dropdown"];

  const addField = () => {
    const newField = { id: steps.length + 1, label: selectedField };
    const welcomeIndex = steps.findIndex(
      (step) => step.label === "Welcome screen"
    );
    const updatedSteps = [
      ...steps.slice(0, welcomeIndex + 1),
      newField,
      ...steps.slice(welcomeIndex + 1),
    ];

    setSteps(updatedSteps);
    setIsModalOpen(false);
    setSelectedField("");
  };

  const removeField = (id) => {
    const stepToRemove = steps.find((step) => step.id === id);
    if (
      stepToRemove &&
      window.confirm("Are you sure you want to remove this field?")
    ) {
      setSteps(steps.filter((step) => step.id !== id));
      setLastDeletedStep(stepToRemove);
      setTimeout(() => {
        setLastDeletedStep(null);
      }, 5000);
    }
  };

  const undoDelete = () => {
    if (lastDeletedStep) {
      setSteps([...steps, lastDeletedStep]);
      setLastDeletedStep(null);
    }
  };

  const handleFieldSelect = (fieldType) => {
    setSelectedField(fieldType);
  };

  const handleEndScreenClick = () => {
    navigate("/EndScreen");
  };

  const handleWelcomeScreenClick = () => {
    navigate("/WelcomeScreen");
  };

  const handleFieldClick = (label) => {
    if (label === "Email Address") {
      navigate("/Email");
    }
  };

  const handleSave = () => {
    alert("The form has been saved.");
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete the entire form, including the End screen?"
      )
    ) {
      alert("The form has been deleted.");
      setSteps([]);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSteps = Array.from(steps);
    const [removed] = reorderedSteps.splice(result.source.index, 1);
    reorderedSteps.splice(result.destination.index, 0, removed);

    setSteps(reorderedSteps);
  };

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "Content":
        return (
          <div className="steps-container">
            <h4>Steps</h4>
            <p>The steps users will take to complete the form</p>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="steps">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {steps.map((step, index) => (
                      <Draggable
                        key={step.id}
                        draggableId={String(step.id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="step-item"
                          >
                            <span
                              onClick={() => {
                                if (step.label === "Welcome screen") {
                                  handleWelcomeScreenClick();
                                } else if (step.label === "End screen") {
                                  handleEndScreenClick();
                                } else {
                                  handleFieldClick(step.label);
                                }
                              }}
                            >
                              {step.label}
                            </span>
                            {step.label !== "Welcome screen" &&
                              step.label !== "End screen" && (
                                <button
                                  className="remove-btn"
                                  onClick={() => removeField(step.id)}
                                >
                                  ✖
                                </button>
                              )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <button
              className="add-field-btn"
              onClick={() => setIsModalOpen(true)}
            >
              + Add field
            </button>

            {lastDeletedStep && (
              <div className="undo-container">
                <span>{`Step "${lastDeletedStep.label}" deleted.`}</span>
                <button onClick={undoDelete}>Undo</button>
              </div>
            )}

            <div className="action-buttons">
              <button className="save-btn" onClick={handleSave}>
                Save & Publish
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        );
      case "Design":
        return (
          <div className="design-tab">
            <h4>Design your form</h4>
            <p>Choose colors, fonts, and layout for your form.</p>
            {/* Add more design options here as needed */}
          </div>
        );
      case "Share":
        return (
          <div className="share-tab">
            <h4>Share your form</h4>
            <p>Get the link or embed code to share your form.</p>
            {/* Add share options here */}
          </div>
        );
      case "Replies":
        return (
          <div className="replies-tab">
            <h4>View form replies</h4>
            <p>Analyze and export the responses to your form.</p>
            {/* Add reply viewing features here */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-editor">
      <div className="header">
        <h4>Dashboard &gt; Form Editor Screen</h4>
        <button className="settings-btn">⚙️</button>
      </div>

      <div className="tabs">
        {["Content", "Design", "Share", "Replies"].map((tab) => (
          <button
            key={tab}
            className={`tab ${tab === activeTab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)} // Switch active tab
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="main-content">{renderTabContent()}</div>

      {isModalOpen && (
        <div className="modal fade-in">
          <div className="modal-content">
            <h3>Select a Field to Add</h3>
            {fieldOptions.map((option) => (
              <button
                key={option}
                className={`modal-option ${
                  selectedField === option ? "selected" : ""
                }`}
                onClick={() => handleFieldSelect(option)}
              >
                {option}
              </button>
            ))}
            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={addField}
                disabled={!selectedField}
              >
                Add Field
              </button>
              <button
                className="modal-cancel-btn"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormEditor;
