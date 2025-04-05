import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <div className=" border-2 border-red rounded m-lg-4 p-lg-4 box-shadow  bg-secondary ">
      <h1 className="text-center">Blog App</h1>
      <div className="container-fluid m-lg-4 text-center">
        <div>
          <Link
            className="btn btn-sm btn-primary m-lg-4 px-5 py-2 "
            to="/login"
          >
            Login
          </Link>
          <Link
            className="btn btn-sm btn-primary m-lg-4 px-5 py-2 "
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
