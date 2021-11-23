import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import routes from "./routes";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard/:path?">
          <DashboardLayout>
            <Switch>
              <Route exact path="/dashboard">
                <Redirect to="/dashboard/customers" />
              </Route>
              {routes.dashboard.map(({ path, children }, index) => {
                return <Route key={index} path={path} children={children} />;
              })}
            </Switch>
          </DashboardLayout>
        </Route>
        <Route>
          <AuthLayout>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              {routes.auth.map(({ path, children }, index) => {
                return <Route key={index} path={path} children={children} />;
              })}
              <Route children={NotFoundPage} />
            </Switch>
          </AuthLayout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
