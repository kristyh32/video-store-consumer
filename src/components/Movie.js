import React from "react";
import PropTypes from "prop-types";

const Movie = props => {
  const {
    id,
    title,
    overview,
    release_date,
    image_url,
    onSelectClick,
    index,
    showSelect,
    movieSearch
  } = props;
  const cardDeck = [0, 4, 8, 12];
  const cardDeckClass = cardDeck.includes(index) ? "card-deck" : "";
  return (
    <div className="mb-5 col col-sm-3 mb-4 p-0">
      <div className="card m-2 d-flex">
        <img
          className="card-img-top"
          style={{ width: "100%", height: "15vw", "object-fit": "cover" }}
          src={image_url}
          alt="movie photo"
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>

          <p className="card-text">
            {" "}
            {overview.length > 128
              ? `${overview.substring(0, 128)}...`
              : overview}
          </p>
          <p className="card-text">
            <small className="text-muted">
              {" "}
              Released: {release_date} - Id: {id}
            </small>
          </p>
          {showSelect && (
            <div className="card-action">
              <button
                className="btn btn-success movie-card--select-pet-btn"
                onClick={onSelectClick}
              >
                {movieSearch ? "Add To Library" : "Select" }
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  image: PropTypes.string,
  externalId: PropTypes.number,
  onSelectPet: PropTypes.func
};

export default Movie;
