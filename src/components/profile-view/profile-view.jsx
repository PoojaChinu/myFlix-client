import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies, user, onToggleFavorite }) => {
  const storedToken = localStorage.getItem("token");

  if (!user) {
    console.log("User not found in localStorage");
    return;
  }

  if (!storedToken) {
    console.log("Token not found in localStorage");
    return;
  }

  const [name, setName] = useState(user?.Name || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");
  const [password, setPassword] = useState(user?.Password || "");

  const fav = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const handleToggleFavorite = (updatedUserDetails) => {
    onToggleFavorite(updatedUserDetails);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Email: email,
      Birthday: birthday,
      Password: password,
    };

    fetch(
      `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${user._id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      }
    ).then(async (response) => {
      if (response.ok) {
        alert("Profile details updated successful");

        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setName(updatedUser.Name);
        setEmail(updatedUser.Email);
        setBirthday(updatedUser.Birthday);
        setPassword(updatedUser.Password);

        window.location.reload();
      } else {
        alert("Profile details updation failed");
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          minLength="4"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
          value={new Date(birthday).toISOString().slice(0, 10)}
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
            <MovieCard
              key={movie._id}
              movie={movie}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={user.FavoriteMovies.includes(movie._id)}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
};
