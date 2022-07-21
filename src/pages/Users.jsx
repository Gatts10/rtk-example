import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Users() {
  const allUsers = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3000/users/${id}`)
      .then((res) => {
        console.log("User deleted");
        dispatch(fetchUsers());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="pt-5 pb-5">
        <h2>List of Users</h2>
      </div>
      {allUsers.loading && <div>Loading...</div>}
      {!allUsers.loading && allUsers.error ? (
        <div>Error: {allUsers.error}</div>
      ) : null}
      {!allUsers.loading && allUsers.users.length ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Edit/Delete</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <Link to={`/edit-user/${user.id}`}>
                    <Button variant="primary">Edit</Button>
                  </Link>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  );
}
