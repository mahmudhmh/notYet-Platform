import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles } from "react-loader-spinner";
import Editor from "@monaco-editor/react";
import NavBarrr from "./NavBarrr";
import "./Compiler.css";

function Compiler() {
  // State variables
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(20);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemData, setProblemData] = useState(null);

  const options = {
    fontSize: fontSize,
  };

  // Mapping of languages to their IDs
  const languageMap = new Map([
    ["python", 92],
    ["javascript", 93],
    ["c", 75],
    ["cpp", 76],
    ["java", 91],
  ]);

  // Function to handle code compilation
  async function compile() {
    setLoading(true);

    if (userCode === "") {
      return;
    }

    try {
      // Prepare request body with code and language
      const requestBody = {
        code: userCode,
        language: languageMap.get(userLang),
      };
      const token = localStorage.getItem("token");
      const problemId = localStorage.getItem("problemId");

      // Configure PATCH request
      const patchConfig = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      };

      // Submit code for compilation
      const submit = await fetch(
        `http://127.0.0.1:5000/problems/submitproblem/${problemId}`,
        patchConfig
      );

      const submissionResult = await submit.json();

      const output = submissionResult.message || "No output available";

      // Update user output state
      setUserOutput(output);

      // Validate user output against test case outputs
      const testCasesMatch = problemData.outputs.every(
        (testCaseOutput, index) => testCaseOutput === problemData.outputs[index]
      );

      // Display success or error toast message
      // if (testCasesMatch) {
      //   toast.success("Congratulations! Test cases passed successfully.");
      // } else {
      //   toast.error("Test cases failed. Please try again.");
      // }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // Fetch problem data when the component mounts
  useEffect(() => {
    fetchProblemData();
  }, []);

  // Function to fetch problem data from the server
  const fetchProblemData = async () => {
    try {
      const token = localStorage.getItem("token");
      const problemId = localStorage.getItem("problemId");
      const response = await fetch(
        `http://127.0.0.1:5000/problems/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      const problem = responseData.data.problem;

      // Check if additional examples exist
      if (problem.additionalExamples && problem.additionalExamples.length > 0) {
        // Append additional examples to the existing inputs and outputs arrays
        problem.inputs.push(
          ...problem.additionalExamples.map((example) => example.input)
        );
        problem.outputs.push(
          ...problem.additionalExamples.map((example) => example.output)
        );
      }
      setProblemData(problem);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <NavBarrr
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main-comp">
        <div className="right-container">
          {problemData ? (
            <>
              {/* Display problem title and description */}
              <h2 className="problem-title">{problemData.title}</h2>
              <h4 className="problem-heading">Description:</h4>
              <div className="prob-desc">
                <p className="problem-description-2">
                  {problemData.description}
                </p>
              </div>
              <h4 className="problem-heading-const">Constraints:</h4>
              <div className="prob-const">
                <p className="problem-description-2">
                  {problemData.constraints}
                </p>
              </div>
              <h4 className="problem-heading-Tc">Test Cases:</h4>
              <div className="test-cases-run">
                {/* Display problem output and test cases */}
                <p className="problem-output">{problemData.output}</p>
                <div className="test-cases">
                  {problemData.inputs.map((input, index) => (
                    <div key={index} className="test-case">
                      <div className="input">
                        <h4 className="problem-heading-comp">
                          Input [{index + 1}]: {input}
                        </h4>
                      </div>
                      <div className="output">
                        <h4 className="problem-heading-comp">
                          Expected Output [{index + 1}]:{" "}
                          {problemData.outputs[index]}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <h4 className="problem-heading">Status:</h4>
              {loading ? (
                <div className="spinner-box">
                  <Circles
                    height="80"
                    width="80"
                    color="#ad8dfe"
                    ariaLabel="circles loader"
                  />
                </div>
              ) : (
                <div className="output-box-compiler">
                  <pre className="user-output">{userOutput}</pre>
                </div>
              )}
            </>
          ) : (
            // Show loading state while fetching problem data
            <div className="spinner-box">
              <Circles
                height="80"
                width="80"
                color="#ad8dfe"
                ariaLabel="circles loader"
              />
            </div>
          )}
        </div>
        <div className="left-container">
          <Editor
            options={options}
            height="900px"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => {
              setUserCode(value);
            }}
          />
          <button className="run-btn-comp" onClick={() => compile()}>
            Submit
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Compiler;
