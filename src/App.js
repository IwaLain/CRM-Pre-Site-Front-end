import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './views/LoginPage'
import CustomerPage from './views/CustomerPage'
import ProfilePage from './views/ProfilePage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/login"/></Route> 
        <Route path='/login' component={LoginPage}/>
        <Route path='/dashboard/:path?' exact>
        <DashboardLayout>
          <Switch>
            <Route path='/dashboard/customer-page' component={CustomerPage}/>
            <Route path='/dashboard/profile-page' component={ProfilePage}/>
          </Switch>
        </DashboardLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
