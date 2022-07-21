import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3000/users", data)
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
        <h2>AddUser</h2>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name", {
              required: "The name is required",
              pattern: {
                value: /^[A-Za-z\s\D]+$/i,
              },
            })}
          />
          <ErrorMessage errors={errors} name="name" as="p" className="error" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "The Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Does not contain a valid Email address",
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" as="p" className="error" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter phone"
            {...register("phone", {
              required: "The phone is required",
              minLength: {
                value: 9,
                message: "The Phone cannot have less than 9 numbers",
              },
              maxLength: {
                value: 9,
                message: "The Phone cannot have more than 9 numbers",
              },
            })}
          />
          <ErrorMessage errors={errors} name="phone" as="p" className="error" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
