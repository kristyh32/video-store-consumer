import React from "react";
import PropTypes from "prop-types";

const Movie = props => {
  const { id, title, overview, release_date, image_url, onSelectClick } = props;
  return (

    <div className="card movie-card">
      <section className="movie-card--header">
        <img src={image_url} alt="movie photo" /> {title}
        <button
          className="btn btn-success movie-card--select-pet-btn"
          onClick={onSelectClick}
        >
          Select
        </button>
      </section>
      
      <section className="movie-card--body">
        {overview.length > 128 ? `${overview.substring(0, 128)}...` : overview}
      </section>
      <section className="movie-card--footer text-muted">
        Released: {release_date} - Id: {id}
      </section>
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
