import axios from "axios";

import {
  FETCH_BRANDS,
  SET_BRANDS_LOADING,
  FETCH_MERCHANTS,
  SET_MERCHANT_ADVANCED_FILTERS,
  SET_MERCHANTS_LOADING,
  FETCH_ORDERS,
  SET_ORDER_ADVANCED_FILTERS,
  SET_ORDERS_LOADING,
  SET_SALES_LOADING,
  FETCH_SALES
} from "./constants";

// fetch brands api
export const fetchBrands = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: SET_BRANDS_LOADING, payload: true });

      const response = await axios.get(`/api/brand`);

      dispatch({
        type: FETCH_BRANDS,
        payload: response.data.brands,
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch({ type: SET_BRANDS_LOADING, payload: false });
    }
  };
};

export const setMerchantLoading = (value) => {
  return {
    type: SET_MERCHANTS_LOADING,
    payload: value,
  };
};

export const fetchMerchants = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setMerchantLoading(true));

      const response = await axios.get(`/api/merchant`);

      const { merchants, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_MERCHANTS,
        payload: merchants,
      });

      dispatch({
        type: SET_MERCHANT_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count },
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setMerchantLoading(false));
    }
  };
};

export const setOrderLoading = (value) => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value,
  };
};

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/all`);

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders,
      });

      dispatch({
        type: SET_ORDER_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count },
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const setSalesLoading = (value) => {
  return {
    type: SET_SALES_LOADING,
    payload: value,
  };
};

export const fetchSales = () => {
  return async (dispatch, getState) => {
    dispatch(setSalesLoading(true));

    const response = await axios.get(`/api/order/all`);

    const { orders, totalPages, currentPage, count } = response.data;

    var groupedOrders = [];
    var quarters = [];
    if(orders.length > 0) {
       groupedOrders = orders.reduce((acc, order) => {
        const date = new Date(order.created);
        const month = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        acc[month] = acc[month] || {
          orderCount: 0,
          productCount: 0,
          total: 0,
        };
        acc[month].orderCount++;
        acc[month].productCount += order.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
        acc[month].total += order.totalWithTax;
        return acc;
      }, {});

      quarters = {
        Q1: { orders: [], productCount: 0, totalPrice: 0 },
        Q2: { orders: [], productCount: 0, totalPrice: 0 },
        Q3: { orders: [], productCount: 0, totalPrice: 0 },
        Q4: { orders: [], productCount: 0, totalPrice: 0 },
      };

      orders.reduce((acc, order) => {
        const month = new Date(order.created).getMonth();
        const quarter = Math.floor(month / 3) + 1;
        const key = `Q${quarter}`;

        acc[key].orders.push(order);
        acc[key].productCount += order.products.reduce(
          (total, product) => total + product.quantity,
          0
        );
        acc[key].totalPrice += order.total;

        return acc;
      }, quarters);

      dispatch({
        type: FETCH_SALES,
        payload: {
          monthly: groupedOrders,
          quaterly: quarters
        },
      })

    dispatch(setSalesLoading(false));
  }

}}