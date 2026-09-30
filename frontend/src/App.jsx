import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Shop from "./pages/Shop";
import Signup from "./pages/Signup";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Missions from "./pages/Missions";
import SubjectDetails from "./pages/SubjectDetails";
import ChapterNotes from "./pages/ChapterNotes";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import AITeacher from "./pages/AITeacher";
import Splash from "./pages/Splash";
import Friends from "./pages/Friends";
function App() {
  return (
    <BrowserRouter>
      <Routes>

       <Route path="/" element={<Splash />} />
<Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/app" element={<AppLayout />}>

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="missions" element={<Missions />} />
          <Route path="shop" element={<Shop />} />
          <Route path="ai-teacher" element={<AITeacher />} />
          <Route
  path="friends"
  element={<Friends />}
/>
<Route
  path="quiz/:subject/:chapter"
  element={<Quiz />}
/>

<Route
  path="result"
  element={<Result />}
/>
          <Route
            path="subject/:subject"
            element={<SubjectDetails />}
          />
          <Route
  path="ai-teacher"
  element={<AITeacher />}
/>

          <Route
            path="notes/:subject/:chapter"
            element={<ChapterNotes />}
          />


        </Route>
        <Route
  path="shop"
  element={<Shop />}
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;