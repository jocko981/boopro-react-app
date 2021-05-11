import React from "react";
import ReactDOM from 'react-dom';

const Modal = ({ movie, imgUrl }) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="modal-overlay ui standard modal visible active">

                <div  className="content">
                    <img src={imgUrl} alt={movie.title} />
                        <div className="header">
                            {movie.title}
                        </div>
                        <h3 className="description-overview">{movie.overview}</h3>
                        <h3 className="description-vote">{movie.vote_average} / 10 <i aria-hidden="true" className="yellow star icon" /></h3>
                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
}

export default Modal;