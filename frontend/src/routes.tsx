import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {privateRoutes, TODOS_ROUTE, publicRoutes, LOGIN_ROUTE} from './utils/routeConsts'
import {useSelector} from 'react-redux'

const Routes = () => {
  const {user} = useSelector(({userReducer}: any) => userReducer)


  return (
    user ?
      (
        <Switch>
          {privateRoutes.map(({path, component}) =>
            <Route key={path} path={path} component={component} exact/>,
          )}
          <Redirect to={TODOS_ROUTE}/>
        </Switch>
      )
      :
      (
        <Switch>
          {publicRoutes.map(({path, component}) =>
            <Route key={path} path={path} component={component} exact/>,
          )}
          <Redirect to={LOGIN_ROUTE}/>
        </Switch>
      )
  )
}

export default Routes