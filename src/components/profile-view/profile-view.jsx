import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const [user] = useState(localUser ? localUser : null);

  const storedToken = localStorage.getItem("token");
  const [token] = useState(storedToken ? storedToken : null);

  if (!user) {
    console.log("User not found in localStorage");
    return;
  }

  if (!token) {
    console.log("Token not found in localStorage");
    return;
  }

  const [name, setName] = useState(user?.Name || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday || "");

  const fav = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie._id);
  });

  const handleToggleFavorite = (movieId, isFavorite) => {
    console.log(
      `Toggle favorite for movie with ID ${movieId} (${
        isFavorite ? "Add to favorites" : "Remove from favorites"
      })`
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
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
    ).then(async (response) => {
      if (response.ok) {
        alert("Profile details updated successful");

        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setName(updatedUser.Name);
        setEmail(updatedUser.Email);
        setBirthday(updatedUser.Birthday);

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
            <MovieCard
              key={movie._id}
              movie={movie}
              onToggleFavorite={handleToggleFavorite}
            />
          </Col>
        ))}
      </Row>
    </Form>
  );
};
