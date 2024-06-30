import PropTypes from "prop-types";
import { Button, Card, CardBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const addFav = () => {
    fetch(
      `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${user._id}/movies/${movie._id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        alert("Movie added to your favourites");
      })
      .catch((e) => console.log(e));
  };

  const removeFav = () => {
    fetch(
      `https://radiant-river-68463-0f7c4a72bc48.herokuapp.com/users/${user._id}/favorites/${movie._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then(() => {
        alert("Movie deleted from your favourites");
      })
      .catch((e) => console.log(e));
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" className="w-100 h-100" src={movie.Image} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button variant="primary" onClick={addFav}>
          Add to Favorites
        </Button>
        <Button variant="primary" onClick={removeFav}>
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
  }).isRequired,
};
