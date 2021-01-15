import React, { Component } from "react"

import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"

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
          <BurgerBuilder />{" "}
        </Layout>
      </div>
    )
  }
}

export default App
