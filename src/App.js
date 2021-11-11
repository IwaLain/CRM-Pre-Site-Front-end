import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import NotFoundPage from './views/NotFoundPage'
import routes from './routes'
import { SizeContext } from './context'

const App = () => {
  const [size, setSize] = useState(window.innerWidth)

  const handleResize = () => {
    setSize(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <SizeContext.Provider value={{ size }}>
        <Router>
            <Switch>
                <Route exact path="/"><Redirect to="/login"/></Route>
                {routes.auth.map(({ path, component }, index) => {
                return <Route key={index} path={path} component={component}/>
                })}
                <Route path='/dashboard/:path?' exact>
                <DashboardLayout>
                <Switch>
                    <Route exact path='/dashboard'><Redirect to="/dashboard/customers"/></Route>
                    {routes.dashboard.map(({ path, component }, index) => {
                    return <Route key={index} path={path} component={component}/>
                    })}
                </Switch>
                </DashboardLayout>
                </Route>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    </SizeContext.Provider>
  );
}

export default App;
