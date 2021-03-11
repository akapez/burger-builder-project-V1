import React, { useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../../hoc/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
  const [isVisible, setISVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setISVisible(false)
  }

  const sideDrawerToggleHandler = () => {
    setISVisible(!isVisible)
  }

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={isVisible}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)
