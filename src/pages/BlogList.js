import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([
    {
      _id: "1",
      BlogDescription: "Hello world ",
      BlogImage: "No Image",
      BlogTitle: "this is a test blog",
    },
  ]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:8000/Crud/getallBlog");
      console.log(res.data.data);
      setBlogs(res.data.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:8000/Crud/deleteData/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchBlogs(); // Refresh list after deletion
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <h2>All Blogs</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Image</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(blogs)}
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog.BlogTitle}</td>
                <td>
                  <img
                    src={`${blog.BlogImage}`}
                    alt="Blog"
                    style={{
                      width: "100px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td>{blog.BlogDescription.substring(0, 80)}...</td>
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
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No blogs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
