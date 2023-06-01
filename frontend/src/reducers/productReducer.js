import { ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQUEST, CLEAR_ERRORS } from "../constants/productConstants";
export const productReducer = (state = { products: [] }, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount
            }
            break;
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                perror: action.payload,
            }
            break;
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;

    }
};