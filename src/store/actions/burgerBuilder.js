import * as actionTypes from "./actionTypes"
import axios from "../../axios-order"
require("dotenv").config()

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients,
  }
}

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  }
}

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(`${process.env.REACT_APP_DATABASE_URL}/ingredients.json`)
      .then((response) => {
        dispatch(setIngredients(response.data))
      })
      .catch((error) => {
        dispatch(fetchIngredientFailed())
      })
  }
}
