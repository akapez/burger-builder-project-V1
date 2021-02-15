import React, { Component } from "react"
import { Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"

import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import Orders from "./containers/Orders/Orders"
import Auth from "./containers/Auth/Auth"

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
          <Route path="/auth" component={Auth} />
          <Route path="/" component={BurgerBuilder} exact />
        </Layout>
      </div>
    )
  }
}

export default App
