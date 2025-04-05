import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const BlogForm = () => {
  const { id } = useParams(); // If editing
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch blog if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/Crud/singleView/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(res.data);
          setTitle(res.data.data.BlogTitle);
          setDescription(res.data.data.BlogDescription);
          setExistingImage(res.data.data.BlogImage);
        })
        .catch(() => setError("Failed to load blog data"));
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    const formData = new FormData();
    formData.append("BlogTitle", title);
    formData.append("BlogDescription", description);
    if (image) formData.append("BlogImage", image);

    try {
      if (id) {
        // Update blog
        await axios.put(
          `http://localhost:8000/Crud/updatePost/${id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        // Create blog
        await axios.post("http://localhost:8000/Crud/addBlog", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      navigate("/");
    } catch (err) {
      setError("Error submitting blog. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows="6"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your blog here..."
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {existingImage && !image && (
            <img
              src={`http://localhost:5000/uploads/${existingImage}`}
              alt="Blog"
              width="150"
              className="mt-2"
            />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {id ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
