import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function PrivateRoute({
  component: Component,
  children,
  ...props
}) {
  const { isAuthenticated } = useAuth()
  return (
    <Route
      {...props}
      render={({ location }) =>
        isAuthenticated ? (
          Component ? (
            <Component {...props} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: '/sign-in',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}
