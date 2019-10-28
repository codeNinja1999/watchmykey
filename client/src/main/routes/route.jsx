import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginContainer from './login/container/LoginContainer'
import RegisterContainer from './register/container/RegisterContainer'
import DashboardContainer from './dashboard/container/DashboardContainer'

const routes = (
  <Switch>
    <Route exact path="/" component={LoginContainer} />
    <Route path="/register" component={RegisterContainer} />
    <Route path="/dashboard" component={DashboardContainer} />
  </Switch>
)

export default routes
