import React, { Component } from "react"

import Aux from "../../hoc/Aux"
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Modal from "../../components/UI/Model/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import Spinner from "../../components/UI/Spinner/Spinner"
import axios from "../../axios-order"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.5,
  bacon: 0.8,
}

class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios
      .get(
        "https://burger-builder-project-17e87-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        this.setState({ ingredients: response.data })
      })
      .catch((error) => {
        this.setState({ error: true })
      })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey]
      })
      .reduce((sum, el) => {
        return sum + el
      }, 0)
    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updateCount = oldCount + 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }

    updatedIngredients[type] = updateCount
    const priceAddition = INGREDIENT_PRICE[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updateCount = oldCount - 1
    const updatedIngredients = {
      ...this.state.ingredients,
    }

    updatedIngredients[type] = updateCount
    const priceDeduction = INGREDIENT_PRICE[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
    this.updatePurchaseState(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchasingCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    // alert("You continue")

    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      )
    }
    queryParams.push("price=" + this.state.totalPrice)
    const queryString = queryParams.join("&")
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    })
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients,
    }
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
    }
    let orderSummary = null

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    )
    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />{" "}
        </Aux>
      )
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchasingCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchasingCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios)
