import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from './reducers/productReducer';
import {
    allUsersReducer,
    forgotPasswordReducer,
    profileReducer,
    userDetailsReducer,
    userReducer,
} from './reducers/userReducer';
import { cartReducer } from "./reducers/cartReducer";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer, orderReducer
} from "./reducers/orderReducer"
//redux requires action, reducers and constants

const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    allOrders: allOrdersReducer,
    orderDetails: orderDetailsReducer,
    order: orderReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: productsReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});

let initialState = {
    cart:
    {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : []
    },
};
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware)));


export default store;