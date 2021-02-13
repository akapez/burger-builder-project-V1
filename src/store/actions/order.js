import * as actionTypes from "./actionTypes"
import axios from "../../axios-order"

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
}

export const PurchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const PurchaseBurger = (orderData) => {
  return (dispatch) => {
    dispatch(PurchaseBurgerStart())
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data)
        dispatch(purchaseBurgerSuccess(response.data, orderData))
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error))
      })
  }
}
