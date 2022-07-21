import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="pt-5 pb-5">
      <h2>Redux Crud Example</h2>
      <div className="pt-5 pb-5">
        <Link to="/add-user">
          <Button variant="primary">Add User</Button>
        </Link>
      </div>
    </div>
  );
}
