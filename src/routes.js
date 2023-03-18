import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import ReportsPage from './pages/reports'
import PrivateRoute from './components/PrivateRoute'
// import NoMatch from 'components/NoMatch'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign-up" />
        </Route>
        <Route exact path="/sign-up" component={SignUpPage} />
        <Route exact path="/sign-in" component={SignInPage} />
        <PrivateRoute path="/reports" component={ReportsPage} />

        {/* <Route component={NoMatch} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
