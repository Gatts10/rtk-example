import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserById } from "../features/users/userSlice";

export default function EditUser() {
  const params = useParams();
  const navigate = useNavigate();

  const userById = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(fetchUserById({ id: params.id }));
  }, []);

  useEffect(() => {
    reset(userById.users);
  }, [userById.users]);

  const onSubmit = (data) => {
    axios
      .patch(`http://localhost:3000/users/${params.id}`, data)
      .then((res) => {
        console.log(res.data);
        navigate("/users");
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(data);
  };

  return (
    <>
      <div className="pt-5 pb-5">
        <h2>Edit User</h2>
      </div>
      {userById.loading && <div>Loading...</div>}
      {!userById.loading && userById.error ? (
        <div>Error: {userById.error}</div>
      ) : null}
      {!userById.loading && !userById.error ? (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              rules={{
                required: "The name is required",
                pattern: {
                  value: /^[A-Za-z\s\D]+$/i,
                  message: "The name can only have letters",
                },
              }}
              render={({ field }) => (
                <Form.Control {...field} type="text" placeholder="Enter name" />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              as="p"
              className="error"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              rules={{
                required: "The Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Does not contain a valid Email address",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="email"
                  placeholder="Enter email"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              as="p"
              className="error"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              rules={{
                required: "The phone is required",
                minLength: {
                  value: 9,
                  message: "The Phone cannot have less than 9 numbers",
                },
                maxLength: {
                  value: 9,
                  message: "The Phone cannot have more than 9 numbers",
                },
              }}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="number"
                  placeholder="Enter phone"
                />
              )}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              as="p"
              className="error"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
      ) : null}
    </>
  );
}