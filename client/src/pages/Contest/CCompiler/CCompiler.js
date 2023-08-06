import { useState, useEffect } from "react";
import "./CCompiler.css";
import Editor from "@monaco-editor/react";
import Navbar from "./NavBarrr";
import { Circles } from "react-loader-spinner";

function CCompiler() {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("python");
  const [userTheme, setUserTheme] = useState("GitHub");
  const [fontSize, setFontSize] = useState(20);
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemData, setProblemData] = useState(null);
  const [registrationType, setRegistrationType] = useState("");
  const [user, setUser] = useState("");
  const [sessionId, setSessionId] = useState("");

  const options = {
    fontSize: fontSize,
  };

  // Mapping of languages to their IDs
  const languageMap = new Map([
    ["python", 92],
    ["javascript", 93],
    ["c", 75],
    ["c++", 76],
    ["java", 91],
  ]);

  // Function to fetch user data and contest ID
  const fetchUserDataAndContestId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data.data.user);

      const contestId = localStorage.getItem("currentContestId");
      
      const currentContest = data.data.user.contests.find(
        (contest) => contest.contestId.toString() === contestId
      );

      if (currentContest) {
        console.log("Current Contest: ", currentContest)
        setRegistrationType(currentContest.registerationType);
        console.log("Registration Type: ", currentContest.registerationType);
        setSessionId(currentContest.sessionId);
        localStorage.setItem("sessionId", currentContest.sessionId);
        console.log("Session Id: ", currentContest.sessionId);
      } else {
        console.log("Current contest not found");
      }

      console.log("User Data: ", data.data.user);
      console.log("Contest ID: ", contestId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Function to handle code compilation
  async function compile() {
    setLoading(true);

    if (userCode === "") {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const problemId = localStorage.getItem("ContestProblemId");
      const contestId = localStorage.getItem("currentContestId");
      console.log("Contest Id: ", contestId);
      console.log("Problem Id: ", problemId);

      if (registrationType === "team") {
        
        const contestResponse = await fetch(
          `http://127.0.0.1:5000/contests/${contestId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const contestData = await contestResponse.json();

        if (contestData.status === "success") {
          const teamId = contestData.data.contest.contestants.find(
            (contestant) => contestant.userId === user._id
          ).teamId;

          console.log("team Id: ", teamId);

          const requestBody = {
            code: userCode,
            language: languageMap.get(userLang),
            contestId: contestId,
            teamId: teamId,
          };

          const patchConfig = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(requestBody),
          };

          const submit = await fetch(
            `http://127.0.0.1:5000/problems/submit-contest-problem/${problemId}`,
            patchConfig
          );
          const submissionResult = await submit.json();
          console.log(submissionResult);

          const output = submissionResult.message || "No output available";
          setUserOutput(output);
        } else {
          console.log("Failed to fetch contest data.");
        }
      } else if (registrationType === "individual") {
        const requestBody = {
          code: userCode,
          language: languageMap.get(userLang),
          contestId: contestId,
        };

        const postConfig = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        };
        const submit = await fetch(
          `http://127.0.0.1:5000/problems/user-submit-contest-problem/${problemId}`,
          postConfig
        );
        const submissionResult = await submit.json();
        console.log(submissionResult);

        const output = submissionResult.message || "No output available";
        setUserOutput(output);
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  // function clearOutput() {
  //   setUserOutput("");
  // }
  useEffect(() => {
    fetchProblemData();
  }, []);

  useEffect(() => {
    fetchUserDataAndContestId();
  }, []);

  // Function to fetch problem data from the server
  const fetchProblemData = async () => {
    try {
      const token = localStorage.getItem("token");
      const problemId = localStorage.getItem("ContestProblemId");
      const response = await fetch(
        `http://127.0.0.1:5000/problems/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = await response.json();
      setProblemData(responseData.data.problem);
      console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="App">
      <Navbar
        userLang={userLang}
        setUserLang={setUserLang}
        userTheme={userTheme}
        setUserTheme={setUserTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <div className="main">
        <div className="right-container">
          {problemData ? (
            <>
              <h2 className="problem-title">{problemData.title}</h2>
              <h4 className="problem-heading">Description:</h4>
              <div className="prob-desc-con">
                <p className="problem-description">{problemData.description}</p>
              </div>
              <h4 className="problem-heading-const">Constraints:</h4>
              <div className="prob-const">
                <p className="problem-description-2">
                  {problemData.constraints}
                </p>
              </div>
              <h4 className="problem-heading">Test Cases:</h4>

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
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : (
                <div className="output-box">
                  <pre className="user-output">{userOutput}</pre>
                </div>
              )}
              <p className="problem-output">{problemData.output}</p>
            </>
          ) : (
            <p>Loading problem data...</p>
          )}

          {/* <h4>Input:</h4>
          <div className="input-box">
            <textarea
              id="code-inp"
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
          </div> */}
          {/* <h4>Output:</h4>
          {loading ? (
            <div className="spinner-box">
              <Circles
                height="80"
                width="80"
                color="#ad8dfe"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div>
          ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button
                onClick={() => {
                  clearOutput();
                }}
                className="clear-btn"
              >
                Clear
              </button>
            </div>
          )} */}
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
          <button className="run-btn" onClick={() => compile()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CCompiler;
