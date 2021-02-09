import React from "react";
import MovieItems from "./MovieItems";

const GenresList = ({ genreList, currentGenreAndMovie, moviePopup }) => {

    const genres = genreList.map((item, index) => {
        let isSelected = null;
        if (index === currentGenreAndMovie.currentGenre) {
            isSelected = true;
        } else {
            isSelected = false;
        }

        return (
            <div key={index} className="movie-list">
                <h2 className="genre-name">
                    {item.genreName} 
                    {index === currentGenreAndMovie.currentGenre && <i aria-hidden="true" className="angle right icon" />}
                </h2>
                <MovieItems moviePopup={moviePopup} currentGenreAndMovie={currentGenreAndMovie} isSelected={isSelected} movies={item.movies} />
            </div>
        );
    })
    
    return (
        <div className="genres-div">
            {genres}
        </div>
    );
}

export default GenresList;