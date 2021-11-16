import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import NotFoundPage from "./views/NotFoundPage";
import routes from "./routes";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        {routes.auth.map(({ path, component }, index) => {
          return <Route key={index} path={path} component={component} />;
        })}
        <Route path="/dashboard/:path?" exact>
          <DashboardLayout>
            <Switch>
              <Route exact path="/dashboard">
                <Redirect to="/dashboard/customers" />
              </Route>
              {routes.dashboard.map(({ path, component }, index) => {
                return <Route key={index} path={path} component={component} />;
              })}
            </Switch>
          </DashboardLayout>
        </Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
