import React, { Component } from "react"

import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import { Route } from "react-router-dom"
import Orders from "./containers/Orders/Orders"

class App extends Component {
  // state = {
  //   show: true,
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false })
  //   })
  // }

  render() {
    return (
      <div>
        <Layout>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" component={BurgerBuilder} exact />
        </Layout>
      </div>
    )
  }
}

export default App
