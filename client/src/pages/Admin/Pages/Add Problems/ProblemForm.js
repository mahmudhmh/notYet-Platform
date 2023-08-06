import React, { useState } from "react";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./ProblemForm.css";

function ProblemForm(props) {
  // State variables for form inputs
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");
  const [enteredRank, setEnteredRank] = useState(800);
  const [enteredDifficulty, setEnteredDifficulty] = useState("Easy");
  const [enteredConstraints, setEnteredConstraints] = useState("");
  const [additionalFields, setAdditionalFields] = useState([
    { input: "", output: "" },
  ]);
  const [hiddenFields, setHiddenFields] = useState([{ input: "", output: "" }]);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Function to create a problem
  const createProblem = async (problemData) => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    try {
      // Send POST request to create a problem
      const response = await fetch("http://localhost:5000/problems", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(problemData),
      });

      if (!response.ok) {
        throw new Error("Problem creation failed");
      }

      const data = await response.json();
      toast.success("Problem created successfully:", data);
      toast.success("Problem created successfully");
      // Perform any additional actions after successful problem creation
    } catch (error) {
      console.error("Error creating problem:", error);
      // Handle the error appropriately
    }
    window.location.reload();
  };

  // Event handlers for form inputs
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
  };

  const rankChangeHandler = (event) => {
    setEnteredRank(event.target.value);
  };

  const difficultyChangeHandler = (event) => {
    setEnteredDifficulty(event.target.value);
  };

  const constraintsChangeHandler = (event) => {
    setEnteredConstraints(event.target.value);
  };

  const additionalInputChangeHandler = (event, index) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = {
      input: event.target.value,
      output: updatedFields[index] ? updatedFields[index].output : "",
    };
    setAdditionalFields(updatedFields);
  };

  const additionalOutputChangeHandler = (event, index) => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = {
      ...updatedFields[index],
      output: event.target.value,
    };
    setAdditionalFields(updatedFields);
  };

  const hiddenInputChangeHandler = (event, index) => {
    const updatedFields = [...hiddenFields];
    updatedFields[index] = {
      input: event.target.value,
      output: updatedFields[index] ? updatedFields[index].output : "",
    };
    setHiddenFields(updatedFields);
  };

  const hiddenOutputChangeHandler = (event, index) => {
    const updatedFields = [...hiddenFields];
    updatedFields[index] = {
      ...updatedFields[index],
      output: event.target.value,
    };
    setHiddenFields(updatedFields);
  };

  // Add new additional input/output fields
  const addAdditionalFields = () => {
    setAdditionalFields([...additionalFields, { input: "", output: "" }]);
  };

  // Remove additional input/output fields
  const removeAdditionalFields = (index) => {
    const updatedFields = [...additionalFields];
    updatedFields.splice(index, 1);
    setAdditionalFields(updatedFields);
  };

  // Add new hidden input/output fields
  const addHiddenFields = () => {
    setHiddenFields([...hiddenFields, { input: "", output: "" }]);
  };

  // Remove hidden input/output fields
  const removeHiddenFields = (index) => {
    const updatedFields = [...hiddenFields];
    updatedFields.splice(index, 1);
    setHiddenFields(updatedFields);
  };

  // File upload handler
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  // Parse uploaded file and populate form fields
  const parseFile = () => {
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        // Parse the file content and extract the data (assuming the file is in JSON format)
        const parsedData = JSON.parse(fileContent);
        // Update the form fields with the parsed data
        setEnteredTitle(parsedData.title);
        setEnteredDescription(parsedData.description);
        setEnteredCategory(parsedData.category);
        setEnteredRank(parsedData.rank);
        setEnteredDifficulty(parsedData.difficulty);
        setEnteredConstraints(parsedData.constraints);
        setAdditionalFields(
          parsedData.inputs.map((input, index) => ({
            input,
            output: parsedData.outputs[index],
          }))
        );
        setHiddenFields(
          parsedData.hiddenInputs.map((input, index) => ({
            input,
            output: parsedData.hiddenOutputs[index],
          }))
        );
      };
      reader.readAsText(uploadedFile);
    }
  };

  // Form submission handler
  const submitHandler = (event) => {
    event.preventDefault();

    // Create an array of inputs and outputs from the additional fields
    const inputs = additionalFields.map((field) => field.input);
    const outputs = additionalFields.map((field) => field.output);

    // Create an array of hidden inputs and outputs from the hidden fields
    const hiddenInputs = hiddenFields.map((field) => field.input);
    const hiddenOutputs = hiddenFields.map((field) => field.output);

    // Create problem object
    const problemData = {
      title: enteredTitle,
      description: enteredDescription,
      category: enteredCategory,
      rank: enteredRank,
      difficulty: enteredDifficulty,
      constraints: enteredConstraints,
      inputs: inputs,
      outputs: outputs,
      hiddenInputs: hiddenInputs,
      hiddenOutputs: hiddenOutputs,
    };

    // Call the createProblem function
    createProblem(problemData);
  };

  const closeWindow = () => {
    window.location.reload();
  };

  return (
    <div className="problem-form">
      <div className="form-header">
        <h2 className="form-title">Create Problem</h2>
        <button className="exit-button-form" onClick={closeWindow}>
          X
        </button>
      </div>
      <form className="problem-form-2" onSubmit={submitHandler}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="form-control">
          <label>Description</label>
          <textarea
            rows="5"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          ></textarea>
        </div>
        <div className="form-control">
          <label>Category</label>
          <input
            type="text"
            value={enteredCategory}
            onChange={categoryChangeHandler}
          />
        </div>
        <div className="form-control">
          <label>Rank</label>
          <input
            type="number"
            value={enteredRank}
            className="rank-control"
            onChange={rankChangeHandler}
          />
        </div>
        <div className="form-control">
          <label>Difficulty</label>
          <select value={enteredDifficulty} onChange={difficultyChangeHandler}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="form-control">
          <label>Constraints</label>
          <textarea
            rows="3"
            value={enteredConstraints}
            onChange={constraintsChangeHandler}
          ></textarea>
        </div>
        <div className="form-control">
          <label>Test Cases Inputs/Outputs</label>
          {additionalFields.map((field, index) => (
            <div key={index} className="additional-field">
              <input
                type="text"
                placeholder="Input"
                value={field.input}
                onChange={(event) => additionalInputChangeHandler(event, index)}
              />
              <input
                type="text"
                placeholder="Output"
                value={field.output}
                onChange={(event) =>
                  additionalOutputChangeHandler(event, index)
                }
              />
              {additionalFields.length > 1 && (
                <button
                  type="button"
                  className="remove-field-button"
                  onClick={() => removeAdditionalFields(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-field-button"
            onClick={addAdditionalFields}
          >
            +
          </button>
        </div>
        <div className="form-control">
          <label>Hidden Test Cases Inputs/Outputs</label>
          {hiddenFields.map((field, index) => (
            <div key={index} className="hidden-field">
              <input
                type="text"
                placeholder="Input"
                value={field.input}
                onChange={(event) => hiddenInputChangeHandler(event, index)}
              />
              <input
                type="text"
                placeholder="Output"
                value={field.output}
                onChange={(event) => hiddenOutputChangeHandler(event, index)}
              />
              {hiddenFields.length > 1 && (
                <button
                  type="button"
                  className="remove-field-button"
                  onClick={() => removeHiddenFields(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-field-button"
            onClick={addHiddenFields}
          >
            +
          </button>
        </div>
        <div className="form-actions">
          <button className="create-btn" type="submit">
            Create
          </button>
        </div>
        <div className="form-control-upload">
          <label>Upload File</label>
          <input type="file" onChange={handleFileUpload} accept=".json" />
          <button className="pasre-data" type="button" onClick={parseFile}>
            Parse
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProblemForm;
