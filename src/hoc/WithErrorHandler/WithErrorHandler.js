import React, { Component } from "react"
import Modal from "../../components/UI/Model/Modal"
import Aux from "../Aux"

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    constructor() {
      super()
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null })
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error })
        }
      )
    }

    componentWillUnmount() {
      // console.log("Will Unmount", this.reqInterceptor, this.resInterceptor)
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    // componentDidMount() {
    //   axios.interceptors.request.use((req) => {
    //     this.setState({ error: null })
    //     return req
    //   })
    //   axios.interceptors.response.use(
    //     (res) => res,
    //     (error) => {
    //       this.setState({ error: error })
    //     }
    //   )
    // }

    errorConfirmHandler = () => {
      this.setState({ error: null })
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error} modelClosed={this.errorConfirmHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler
