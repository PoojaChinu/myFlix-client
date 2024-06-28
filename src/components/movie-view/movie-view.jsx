import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Card } from "react-bootstrap";
import "../movie-view/movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <>
      <Row md={2} className="">
        <Col md={4} className="">
          <Card.Img
            src={movie.Image}
            key={movie.Image}
            alt="movie-poster"
            className="w-100 h-100"
          />
        </Col>
        <Col md={8} className="movie-view">
          <Col className="title text-md-lg">
            <span className="fw-bolder">Title: </span>
            <span key={movie._id}>{movie.Title}</span>
          </Col>
          <Col>
            <span className="fw-bolder">Director: </span>
            <span key={movie._id}>{movie.Director.Name}</span>
          </Col>
          <Col>
            <span className="fw-bolder">Genre: </span>
            <span key={movie._id}>{movie.Genre.Name}</span>
          </Col>
          <Col className="button-wrapper">
            <Button
              onClick={() => onBackClick()}
              variant="link"
              className="back-button"
            >
              Back
            </Button>
          </Col>
        </Col>
      </Row>
      <hr />
    </>
  );
};

// Here is where we define all the props constraints for the MovieView
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
