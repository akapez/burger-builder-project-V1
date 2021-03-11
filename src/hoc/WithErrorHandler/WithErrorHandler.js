import React from 'react'
import Modal from '../../components/UI/Model/Modal'
import Aux from '../Aux'
import useHttpError from '../../hooks/http-error'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpError(axios)

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler
