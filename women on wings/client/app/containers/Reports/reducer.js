import {
  FETCH_SALES,
  SET_SALES_LOADING
} from "./constants";

const initialState = {
  monthly: {},
  quaterly: {}
};

const salesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALES:
            return {
                ...state,
                monthly: action.payload.monthly,
                quaterly: action.payload.quaterly
            };
        case SET_SALES_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
}}

export default salesReducer;
