import React from "react";
import MovieItems from "./MovieItems";

const GenresList = ({ genreList, currentGenreAndMovie, moviePopup, slicer }) => {

    const genres = genreList.map((item, index) => {
        let isSelected = false;
        const sliceGenre = item.movies.slice(slicer[index], slicer[index] + 6);
        
        if (currentGenreAndMovie.currentGenre === index) {
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
                
                <MovieItems moviePopup={moviePopup} currentGenreAndMovie={currentGenreAndMovie} isSelected={isSelected} movies={sliceGenre} />
                
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