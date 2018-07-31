
const searchParam = (state = [], action) => {
    switch (action.type) {
        case 'SET_PARAM':
            return action.data;
        default:
            return state
    }
}

export default searchParam;