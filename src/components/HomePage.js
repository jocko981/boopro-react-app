import React from "react";
import genresData from "../data/genres.json";
import axios from "axios";
import GenresList from "./GenresList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { genreList: [], moviePopup: false, currentGenre: 0, currentMovie: 0};
        
        let allGenres = [];
       
        genresData.genres.map((genre) => { 
            const API_KEY = "d38aa8716411ef7d8e9054b34a6678ac";    
            return (           
                axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre.id}&page=1&api_key=${API_KEY}`)
                .then(response => {
                    const genreF = {
                        genreName: genre.name,
                        movies: response.data.results.slice(0, 6)
                    };

                allGenres.push(genreF);

                this.setState({genreList: allGenres});
            })
            );
        })

        if(!window.localStorage.getItem("access_token")) {
            this.props.history.push("/");
        }
    }
    
    
        
    componentDidMount() {

        window.addEventListener("keydown", (e) => {

            if (this.state.moviePopup === false) {
                if(e.key === "ArrowDown") {
                    if(this.state.currentGenre === this.state.genreList.length - 1) {
                        this.setState({ currentGenre: 0 });
                    } else {
                        this.setState({ currentGenre: this.state.currentGenre + 1 });
                    }
    
                } else if (e.key === "ArrowUp") {
                    if(this.state.currentGenre === 0) {
                        this.setState({ currentGenre: this.state.genreList.length - 1 });
                    } else {
                        this.setState({ currentGenre: this.state.currentGenre - 1 });
                    }
    
                } else if (e.key === "ArrowRight") {
                    if(this.state.currentMovie === this.state.genreList[0].movies.length - 1) {
                        this.setState({ currentMovie: 0 });
                    } else {
                        this.setState({ currentMovie: this.state.currentMovie + 1 });
                    }
    
                } else if (e.key === "ArrowLeft") {
                    if(this.state.currentMovie === 0) {
                        this.setState({ currentMovie: this.state.genreList[0].movies.length - 1 });
                    } else {
                        this.setState({ currentMovie: this.state.currentMovie - 1 });
                    }
    
                } else if (e.key === "Enter") {
                    this.setState({ moviePopup: true });
                }
            } else if (this.state.moviePopup === true) {
                if (e.key === "Escape") {
                    this.setState({moviePopup: false});
                }
            }
            
            
        });

        

    }
    
    render() {

        return (
            <div>
                <GenresList 
                    genreList={this.state.genreList} 
                    currentGenreAndMovie={{ currentGenre: this.state.currentGenre, currentMovie: this.state.currentMovie }} 
                    moviePopup={this.state.moviePopup}
                />                
            </div>
        );
    }
}

export default HomePage;