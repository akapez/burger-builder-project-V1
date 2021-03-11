import React, { useState, useEffect, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Model/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-order"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import * as actions from "../../store/actions/index"

const BurgerBuilder = props => {
 
  const [purchasing, setPurchasing] = useState(false)

  const dispatch = useDispatch()

  const ings = useSelector(state => {
    return state.burgerBuilder.ingredients
  })

  const price = useSelector(state => state.burgerBuilder.totalPrice)
  const error = useSelector(state => state.burgerBuilder.error)
  const isAuthenticated = useSelector(state => state.auth.token !== null)


  const onIngredientAdd = (ingName) => dispatch(actions.addIngredient(ingName))
  const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName))
  const onInitIngredients = useCallback(() => dispatch(actions.initIngredients()), [dispatch])
  const onInitPurchase = () => dispatch(actions.purchaseInit())
  const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))

  useEffect(() => {
    onInitIngredients()
  }, [onInitIngredients])
  
  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    return sum > 0
  }

  const purchaseHandler = () => {
    if (isAuthenticated) {
      setPurchasing(true)
    } else {
      onSetAuthRedirectPath("/checkout")
      props.history.push("/auth")
    }
  }

  const purchasingCancelHandler = () => {
    setPurchasing(false)
  }

  const purchaseContinueHandler = () => {
    onInitPurchase()
    props.history.push("/checkout")
  }

  
    const disableInfo = {
      ...ings,
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null

    let burger = error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    )
    if (ings) {
      burger = (
        <Aux>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onIngredientAdd}
            ingredientRemoved={onIngredientRemoved}
            disabled={disableInfo}
            purchasable={updatePurchaseState(ings)}
            ordered={purchaseHandler}
            isAuth={isAuthenticated}
            price={price}
          />
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          price={price}
          purchaseCancelled={purchasingCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      )
    }

    return (
      <Aux>
        <Modal
          show={purchasing}
          modelClosed={purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  
}


export default withErrorHandler(BurgerBuilder, axios)
