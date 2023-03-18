import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignInPage from './pages/sign-in'
// import DashboardPage from 'pages/dashboard'
// import AdminsPage from 'pages/admins'
// import PostsPage from 'pages/posts'
// import PollsPage from 'pages/polls'
// import HubTopicPage from 'pages/hub_topics'
// import BlogPage from 'pages/blogs'
// import DailyInsightsPage from 'pages/daily-insights'
// import MarketPlaceBannerPage from 'pages/market_place_banners'

// import PrivateRoute from 'components/PrivateRoute'
// import NoMatch from 'components/NoMatch'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/sign-in" component={SignInPage} />
        {/* <PrivateRoute exact path="/" component={DashboardPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />

        <PrivateRoute path="/admins" component={AdminsPage} />
        <PrivateRoute path="/posts" component={PostsPage} />
        <PrivateRoute path="/polls" component={PollsPage} />
        <PrivateRoute path="/hub-topics" component={HubTopicPage} />
        <PrivateRoute path="/blogs" component={BlogPage} />
        <PrivateRoute path="/market-place-banners" component={MarketPlaceBannerPage} />
        <PrivateRoute path="/daily-insights" component={DailyInsightsPage} /> */}

        {/* <Route component={NoMatch} /> */}
      </Switch>
    </BrowserRouter>
  )
}

export default AppRoutes
