import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.css"
import axios from "../../../axios-order"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault()
    this.setState({ loading: true })
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Avishka Kapuruge",
        address: {
          street: "Park Road",
          zipCode: "1005",
          country: "Sri Lanka",
        },
        email: "avishka@example.com",
      },
      deliverMethod: "fastest",
    }
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false })
        this.props.history.push("/")
      })
      .catch((error) => {
        this.setState({ loading: false })
      })
  }

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Enter Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Enter Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Enter Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Enter Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER{" "}
        </Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
