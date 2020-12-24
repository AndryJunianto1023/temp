import React from "react";
import { Link } from "react-router-dom";
import { AppProvider } from "../context";

export default function Error() {
  return (
    <section className="error-page">
      <div className="error-container">
        <h1>oops! wrong page</h1>
        <Link to="/">
          <button>Back Home</button>
        </Link>
      </div>
    </section>
  );
}
