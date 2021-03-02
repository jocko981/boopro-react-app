import React from "react";
import { connect } from "react-redux";
import { fetchGenres } from "../actions";

import genresData from "../data/genres.json";
import GenresList from "./GenresList";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { moviePopup: false, currentGenre: 0, currentMovie: 0, slicer: genresData.genres.map(() => { return 0 }) };
        // ovo sam prebacio u Actions

        if(!window.localStorage.getItem("access_token")) {
            this.props.history.push("/");
        }
    }
        
    componentDidMount() {
        this.props.fetchGenres(genresData);
        
        window.addEventListener("keydown", (e) => {
            if (this.state.moviePopup === false) {
                if(e.key === "ArrowDown") {
                    if(this.state.currentGenre === this.props.state.genreList.length - 1) {
                        this.setState({ currentGenre: 0 });
                    } else {
                        this.setState({ currentGenre: this.state.currentGenre + 1 });
                    }
    
                } else if (e.key === "ArrowUp") {
                    if(this.state.currentGenre === 0) {
                        this.setState({ currentGenre: this.props.state.genreList.length - 1 });
                    } else {
                        this.setState({ currentGenre: this.state.currentGenre - 1 });
                    }
    
                } else if (e.key === "ArrowRight") {

                    const newSlicer = this.state.slicer;

                    if(newSlicer[this.state.currentGenre] === this.props.state.genreList[this.state.currentGenre].movies.length - 6) {
                        newSlicer[this.state.currentGenre] = this.props.state.genreList[this.state.currentGenre].movies.length - 6;
                        this.setState({ slicer: newSlicer});
                    } else 

                    if(this.state.currentMovie === 5) {
                        newSlicer[this.state.currentGenre] = this.state.slicer[this.state.currentGenre] + 1;

                        this.setState({ slicer: newSlicer });
                    } else {
                        this.setState({ currentMovie: this.state.currentMovie + 1 });
                    }
    
                } else if (e.key === "ArrowLeft") {
                    
                    const newSlicer = this.state.slicer;

                    if (this.state.currentMovie === 0) {

                        if(this.state.currentMovie === 0 && this.state.slicer[this.state.currentGenre] > 0) {
                            newSlicer[this.state.currentGenre] = this.state.slicer[this.state.currentGenre] - 1;
    
                            this.setState({ slicer: newSlicer });
                        } else 

                        this.setState({ currentMovie: 0 });
                    } else
                    
                    if(newSlicer[this.state.currentGenre] === 0) {
                        newSlicer[this.state.currentGenre] = 0;
                        this.setState({ slicer: newSlicer, currentMovie: this.state.currentMovie - 1});
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
                    genreList={this.props.state.genreList} 
                    currentGenreAndMovie={{ currentGenre: this.state.currentGenre, currentMovie: this.state.currentMovie }} 
                    moviePopup={this.state.moviePopup}
                    slicer={this.state.slicer}
                />                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { state: state };
}

export default connect(mapStateToProps, { fetchGenres })(HomePage);