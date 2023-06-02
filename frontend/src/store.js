import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productReducer, productDetailsReducer } from './reducers/productReducer';
//redux requires action, reducers and constants

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer

});

let initialState = {};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));


export default store;