
const INITIAL_STATE = {
    genreList: []
};

const rootReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_GENRES":
            return {...state, genreList: action.payload};
        case "FETCH_ITEMZ":
            return {...state, itemz: action.payload};

        default:
            return state;
    }
};

export default rootReducer;