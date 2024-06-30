import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(localUser ? localUser : null);

  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken ? storedToken : null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const fav = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: username,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${localUser._id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Profile details updated successful");

        window.location.reload();
      } else {
        alert("Profile details updation failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="4"
        />
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBdate">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Edit Profile
      </Button>
      <Link to={`/deleteProfile`}>
        <Button variant="primary">Delete Profile</Button>
      </Link>
      <Row>
        {fav.map((movie) => (
          <Col
            className="mb-5 col-12 col-md-6 col-lg-4"
            key={movie._id}
            movie={movie}
          >
            <MovieCard key={movie._id} movie={movie} />
          </Col>
        ))}
      </Row>
    </Form>
  );
};

export const DeleteProfile = () => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [setUser] = useState(localUser ? localUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  fetch(
    `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${localUser._id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ).then((response) => {
    if (response.ok) {
      setUser(null);
      setToken(null);
      localStorage.clear();

      alert("Profile deleted");
    } else {
      alert("Profile deletion failed");
    }
  });
};
