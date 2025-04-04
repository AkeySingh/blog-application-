import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BlogForm from "./pages/BlogForm";
import ViewBlog from "./pages/ViewBlog";
import BlogList from "./pages/BlogList";

function App() {
  return (
    <>
      {/*  <Router> */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
          <Route path="/view/:id" element={<ViewBlog />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
