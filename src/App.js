import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GlobalContext } from "./context";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import NotFound from "./components/pages/NotFound/NotFound";
import routes from "./routes";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import LoginPage from "./components/pages/Login/Login";
import UIKit from "./components/UIKit/UIKit";

const App = () => {
  const [pageTitle, setPageTitle] = useState();
  const [pageType, setPageType] = useState();
  const [pagePath, setPagePath] = useState();
  const [entityID, setEntityID] = useState();
  const [editId, setEditId] = useState();
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [customerStructure, setCustomerStructure] = useState({});
  const [userProfile, setUserProfile] = useState({});

  return (
    <GlobalContext.Provider
      value={{
        pageTitle,
        setPageTitle,
        pageType,
        setPageType,
        pagePath,
        setPagePath,
        editId,
        setEditId,
        entityID,
        setEntityID,
        showFormModal,
        setShowFormModal,
        userProfile,
        setUserProfile,
        selectedCustomer,
        setSelectedCustomer,
        customerStructure,
        setCustomerStructure,
      }}
    >
      <Router>
        <Switch>
          <Route path="/dashboard/:path?">
            {localStorage.getItem("token") ? (
              <DashboardLayout>
                <Switch>
                  {routes.dashboard.map(({ path, children }, index) => {
                    return (
                      <Route key={index} path={path} children={children} />
                    );
                  })}
                </Switch>
              </DashboardLayout>
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route>
            <AuthLayout>
              <Switch>
                <Route exact path="/">
                  {localStorage.getItem("token") ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/login">
                  {localStorage.getItem("token") ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <LoginPage />
                  )}
                </Route>
                {/* // {routes.auth.map(({ path, children }, index) => {
                //   return <Route key={index} path={path} children={children} />;
                // })}  */}
                <Route component={NotFound} />
              </Switch>
            </AuthLayout>
          </Route>
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;
