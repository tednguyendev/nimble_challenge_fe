import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import SignInPage from './pages/sign-in'
import SignUpPage from './pages/sign-up'
import ReportPage from './pages/report'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import NoMatch from './components/NoMatch'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/sign-in" />
        </Route>
        <PublicRoute exact path="/sign-up" component={SignUpPage} />
        <PublicRoute exact path="/sign-in" component={SignInPage} />
        <PrivateRoute path="/reports" component={ReportPage} />

        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
