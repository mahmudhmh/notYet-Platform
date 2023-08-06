import React from "react";
import SignUp from "./login & signup/SignUp";
import Login from "./login & signup/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import ForgetPwd from "./login & signup/ForgetPwd";
import ResetPwd from "./login & signup/ResetPassword";
import VerifyEmail from "./login & signup/VerifyEmail";
import Problems from "./pages/Problems/Problems";
import Content from "./pages/Content/Content";
import Contest from "./pages/Contest/Contest";
import Team from "./pages/Team/Team";
import About from "./pages/About/About";
import ContactUs from "./pages/Contact Us/ContactUs";
import FAQ from "./pages/FAQ/FAQ";
import Feedback from "./pages/Feedback/Feedback";
import PP from "./pages/Privacy and Policy/PP";
import AccountSettings from "./pages/Profile/Pages/AccountSettings";
import Submissions from "./pages/Profile/Pages/Submissions";
import EnrolledTeams from "./pages/Profile/Pages/EnrolledTeams";
import Profile from "./pages/Profile/Profile";
import AdminProfile from "./pages/Admin/AdminProfile";
import Compiler from "./pages/Compiler/Compiler";
import CCompiler from "./pages/Contest/CCompiler/CCompiler";
import AddProblems from "./pages/Admin/Pages/Add Problems/AddProblems";
import ManageTeam from "./pages/Admin/Pages/ManageTeam";
import ManageUsers from "./pages/Admin/Pages/ManageUsers";
import Levels from "./pages/Levels/15/Levels";
import Ds from "./pages/Levels/DS/Ds";
import Iq from "./pages/Levels/IQ/Iq";
import Assessment from "./pages/Assessment/Assessment";
import AdminContest from "./pages/Admin/Pages/AdminContest";
import Settings from "./pages/Admin/Pages/Settings";
import ContestProblems from "./pages/Contest/ContestsProblems";
import AdminQuiz from "./pages/Admin/Pages/Quiz";
import AcceptTeams from "./pages/Profile/Pages/AcceptTeams";
import RejectTeams from "./pages/Profile/Pages/RejectTeams";
import Board from "./Components/container/container";
import WindowBoard from "./Components/windowContainer/windowContainer";
import VideoWelcome from "./pages/Assessment/VideoWelcome";
import Roadmap from "./pages/Assessment/Roadmap";
import ExerciseOne from "./pages/Levels/15/ExerciseOne";
import ExcersieTwo from "./pages/Levels/15/ExcersieTwo";
import ExerciseThree from "./pages/Levels/15/ExerciseThree";
import ExerciseeOne from "./pages/Levels/DS/ExerciseeOne";
import ExerciseeTwo from "./pages/Levels/DS/ExerciseeTwo";
import ExerciseeThree from "./pages/Levels/DS/ExerciseeThree";
import InterviewQuestions from "./pages/Levels/IQ/InterviewQuestions";

function App() {
  function handleSignUpData(signUpData) {
    // Use the signUpData as needed
    console.log(signUpData);
  }
  // function Test1(data) {
  //   console.log("In App TEST.jsssss");
  //   console.log(data); //EL DATA EL 3AMALTLO SAVE
  // }
  function Test2(data) {
    console.log("In App TEST.jsssss");
    console.log(data); //EL DATA EL 3AMALTLO SAVE
  }
  // function Test3(data) {
  //   console.log("In App TEST.jsssss");
  //   console.log(data); //EL DATA EL 3AMALTLO SAVE
  // }
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/signup"
          element={<SignUp onSubmitTest={handleSignUpData} />}
        />
        <Route path="/login" element={<Login OnSubmitTest={Test2} />} />
        <Route path="/login/forgetPwd" element={<ForgetPwd />} />
        <Route path="/login/ResetPassword" element={<ResetPwd />} />
        <Route path="/login/VerifyEmail" element={<VerifyEmail />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/assessment/roadmap" element={<Roadmap />} />
        <Route exact path="/problems" element={<Problems />} />
        <Route exact path="/content" element={<Content />} />
        <Route exact path="/contests" element={<Contest />} />
        <Route exact path="/contests/problems" element={<ContestProblems />} />
        <Route exact path="/content/15 days" element={<Levels />} />
        <Route exact path="/content/ds" element={<Ds />} />
        <Route exact path="/content/iq" element={<Iq />} />
        <Route exact path="/team" element={<Team />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/Contact US" element={<ContactUs />} />
        <Route exact path="/FAQ" element={<FAQ />} />
        <Route exact path="/Feedback" element={<Feedback />} />
        <Route exact path="/Privacy and Policy" element={<PP />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/problems/compiler" element={<Compiler />} />
        <Route exact path="/contest/compiler" element={<CCompiler />} />
        <Route exact path="/accept-team-request" element={<AcceptTeams />} />
        <Route exact path="/reject-team-request" element={<RejectTeams />} />
        <Route exact path="/contest/whiteboard" element={<Board />} />
        <Route
          exact
          path="/contest/whiteboard-window"
          element={<WindowBoard />}
        />
        <Route exact path="/VideoWelcome" element={<VideoWelcome />} />
        <Route
          exact
          path="/profile/Account Settings"
          element={<AccountSettings />}
        />
        <Route
          exact
          path="/profile/Enrolled Teams"
          element={<EnrolledTeams />}
        />
        <Route exact path="/profile/Submissions" element={<Submissions />} />
        <Route exact path="/Admin" element={<AdminProfile />} />
        <Route exact path="/Admin/Add Problems" element={<AddProblems />} />
        <Route exact path="/Admin/manage Teams" element={<ManageTeam />} />
        <Route exact path="/Admin/contest" element={<AdminContest />} />
        <Route exact path="/Admin/Quiz" element={<AdminQuiz />} />
        <Route exact path="/Admin/settings" element={<Settings />} />
        <Route
          exact
          path="/content/15 days/one"
          element={<ExerciseOne />}
        />{" "}
        <Route exact path="/content/15 days/two" element={<ExcersieTwo />} />{" "}
        <Route
          exact
          path="/content/15 days/three"
          element={<ExerciseThree />}
        />{" "}
        <Route exact path="/content/ds/one" element={<ExerciseeOne />} />{" "}
        <Route exact path="/content/ds/two" element={<ExerciseeTwo />} />{" "}
        <Route exact path="/content/ds/three" element={<ExerciseeThree />} />{" "}
        <Route exact path="/content/iq/one" element={<InterviewQuestions />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
