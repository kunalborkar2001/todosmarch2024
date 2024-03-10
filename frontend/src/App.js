import React from "react";
import TaskDashboard from "./components/TaskDashboard/TaskDashboard";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<TaskDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
