import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data.blog);
    } catch (err) {
      setError("Failed to load blog");
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!blog) {
    return <div className="text-center mt-5">Loading blog...</div>;
  }

  return (
    <div className="card">
      <img
        src={`http://localhost:5000/uploads/${blog.image}`}
        className="card-img-top"
        alt={blog.title}
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h3 className="card-title">{blog.title}</h3>
        <p className="card-text">{blog.description}</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ViewBlog;
