import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import searchReducer from './reducers/searchReducer';
import searchParam from './reducers/searchParam';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';

const reducer = combineReducers({
    hotels: searchReducer,
    parms: searchParam,
    errors: errorReducer,
    loading: loadingReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

