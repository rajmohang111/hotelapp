
const searchReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HOTELS':
            return [...action.data];
        case 'SEARCH_HOTELS':
            return action.masterData.filter((hotel) => hotel.name === action.data.destination);
        default:
            return state
    }
}

export default searchReducer;