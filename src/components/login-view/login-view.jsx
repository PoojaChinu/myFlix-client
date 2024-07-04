import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    fetch(
      `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/login?Name=${username}&Password=${password}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          console.log("Login response: ", data);

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);

          onLoggedIn(data.user.name, data.token);
          window.location.reload();
        } else {
          alert("Login failed. No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="userLogin">
      <Form.Group controlId="formUsername" className="inputGroup">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          className="loginForm"
          type="text"
          value={username}
          required
          minLength="5"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="inputGroup">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          className="loginForm"
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
