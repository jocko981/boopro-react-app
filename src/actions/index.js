
import axios from "axios";
const API_KEY = "d38aa8716411ef7d8e9054b34a6678ac";

export const fetchGenres = (genresData) => async dispatch => {
    
        const response = await Promise.all(genresData.genres.map((genre) => { 
                
            return (           
                axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&page=1&api_key=${API_KEY}`)
            );
        })) 

        let allGenres = response.map((item, index) => {
            return {
                genreName: genresData.genres[index].name,
                movies: item.data.results
            };
        });
        
    dispatch ({
        type: "FETCH_GENRES",
        payload: allGenres
    });
}