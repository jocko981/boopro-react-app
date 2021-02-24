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
                    if(this.state.currentMovie === 5) {
                        const newSlicer = this.state.slicer;
                        newSlicer[this.state.currentGenre] = this.state.slicer[this.state.currentGenre] + 1;

                        if(this.state.slicer[this.state.currentGenre] === this.props.state.genreList[this.state.currentGenre].movies.length - 5) {
                            newSlicer[this.state.currentGenre] = 0;
                            this.setState({ slicer: newSlicer, currentMovie: 0});
                        }

                        this.setState({ slicer: newSlicer });
                    } else 

                    if(this.state.currentMovie === this.props.state.genreList[this.state.currentGenre].movies.length - 1) {
                        this.setState({ currentMovie: 0 });
                    } else {
                        this.setState({ currentMovie: this.state.currentMovie + 1 });
                    }
    
                } else if (e.key === "ArrowLeft") {
                    if(this.state.currentMovie === 0) {
                        const newSlicer = this.state.slicer;
                        newSlicer[this.state.currentGenre] = this.state.slicer[this.state.currentGenre] - 1;

                        if(this.state.slicer[this.state.currentGenre] === - 1) {
                            newSlicer[this.state.currentGenre] = this.props.state.genreList[this.state.currentGenre].movies.length - 6;
                            this.setState({ slicer: newSlicer, currentMovie: 5});
                        }

                        this.setState({ slicer: newSlicer });
                    } else

                    if(this.state.currentMovie === 0) {
                        this.setState({ sliceMovie: this.state.sliceMovie - 1 });
                    } else

                    if(this.state.currentMovie === 0) {
                        this.setState({ currentMovie: this.props.state.genreList[this.state.currentGenre].movies.length - 1 });
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