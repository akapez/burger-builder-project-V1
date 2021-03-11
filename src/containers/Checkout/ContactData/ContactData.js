import React, { useState } from "react"
import { connect } from "react-redux"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-order"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler"
import * as actions from "../../../store/actions/index"
import { updateObject, checkValidity } from "../../../shared/utility"

const ContactData = props => {
   
  const [orderForm, setOrderForm] = useState ({
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliverMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    })

    const [formIsValid, setFormIsValid] = useState(false)
  

  const orderHandler = (e) => {
    e.preventDefault()

    const formData = {}
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[
        formElementIdentifier
      ].value
    }

    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    }

    props.onOrderBurger(order, props.token)
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    const updateFormElement = updateObject(
      orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    )
    const updateOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updateFormElement,
    })

    let formIsValid = true
    for (let inputIdentifier in updateOrderForm) {
      formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid
    }
    setOrderForm(updateOrderForm)
    setFormIsValid(formIsValid)
    
  }

  
    const formElementArray = []
    for (let key in orderForm) {
      formElementArray.push({
        id: key,
        config: orderForm[key],
      })
    }

    let form = (
      <form onSubmit={orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => inputChangeHandler(event, formElement.id)}
          />
        ))}

        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    )
    if (props.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
}


const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios))
