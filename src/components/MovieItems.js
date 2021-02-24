import React from "react";
import Modal from "./Modal";

const MovieItems = ({ movies, isSelected, currentGenreAndMovie, moviePopup }) => {
    const length = movies.length;

    const movieImages = movies.map((movie, index) => {
        const imgUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        return (
            <div key={index} className="movie-div" style={{ float: "left", width: `calc(100% / ${length})` }}>
                <img src={imgUrl} alt={movie.title} className={isSelected && (index === currentGenreAndMovie.currentMovie) ? "movie-img-selected" : "movie-img"} />
                {isSelected && (index === currentGenreAndMovie.currentMovie) && <h4 className="movie-title">{movie.title}</h4>}
                {moviePopup && isSelected && (index === currentGenreAndMovie.currentMovie) && <Modal movie={movie} imgUrl={imgUrl} />}
            </div>
            
        );
    })

    return (
        <div>
            {movieImages}
        </div>
    );
}

export default MovieItems;