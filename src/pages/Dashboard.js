import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
    } catch (err) {
      setError("Failed to load user data");
    }
  };

  const fetchUserBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.blogs);
    } catch (err) {
      setError("Failed to load blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  useEffect(() => {
    if (!token) return navigate("/login");
    fetchUserData();
    fetchUserBlogs();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {user && (
        <div className="d-flex align-items-center mb-4">
          <img
            src={`http://localhost:5000/uploads/${user.profile}`}
            alt="Profile"
            width="60"
            height="60"
            className="rounded-circle me-3"
          />
          <h5 className="mb-0">{user.email}</h5>
        </div>
      )}

      <h4>Your Blogs</h4>
      {blogs.length === 0 ? (
        <p>You haven't created any blogs yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/uploads/${blog.image}`}
                      alt={blog.title}
                      width="100"
                    />
                  </td>
                  <td>{blog.description.slice(0, 100)}...</td>
                  <td>
                    <Link
                      to={`/view/${blog._id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit/${blog._id}`}
                      className="btn btn-sm btn-warning me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
