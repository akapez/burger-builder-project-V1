import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
}

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.8,
}

const addIngredient = (state, action) => {
  const updateIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  }
  const updateIngredients = updateObject(state.ingredients, updateIngredient)
  const updateState = {
    ingredients: updateIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
    building: true,
  }
  return updateObject(state, updateState)
}

const removeIngredient = (state, action) => {
  const updateIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  }
  const updateIngs = updateObject(state.ingredients, updateIng)
  const updateSta = {
    ingredients: updateIngs,
    totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName],
    building: true,
  }
  return updateObject(state, updateSta)
}

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    totalPrice: 4,
    error: false,
    building: false,
  })
}

const fetchIngredient = (state, action) => {
  return updateObject(state, { error: true })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action)
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action)
    case actionTypes.SET_INGREDIENT:
      return setIngredient(state, action)
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return fetchIngredient(state, action)
    default:
      return state
  }
}

export default reducer
