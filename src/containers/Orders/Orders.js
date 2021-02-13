import React, { Component } from "react"
import { connect } from "react-redux"
import Order from "../../components/Order/CheckoutSummary/Order"
import axios from "../../axios-order"
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrder()
  }

  render() {
    let orders = <Spinner />
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))
    }
    return <div>{orders}</div>
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrder()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios))
