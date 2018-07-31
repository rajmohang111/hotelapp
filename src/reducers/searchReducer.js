
const searchReducer = (state = [], action) => {

    console.log(state, action);

    switch (action.type) {
        case 'SET_HOTELS':
            return [...action.data];
        case 'SEARCH_HOTELS':
            console.log(state, action);
            return action.masterData.filter((hotel) => hotel.name === action.data.destination);
        default:
            return state
    }
}

export default searchReducer;