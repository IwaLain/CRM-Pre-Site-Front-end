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
import "./scss/ui-kit.scss";
import Profile from "./js/api/profile";

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
  const [equipmentTypeList, setEquipmentTypeList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Profile.getProfile().then((data) => {
        setUserProfile(data.user);
        if (data.user.last_customer) {
          fetch(
            process.env.REACT_APP_SERVER_URL +
              "/api/customer/" +
              data.user.last_customer +
              "?access-token=" +
              localStorage.getItem("token")
          )
            .then((res) => res.json())
            .then((customer) => {
              setSelectedCustomer(customer.customer[data.user.last_customer]);
            });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (selectedCustomer.id) {
      fetch(
        process.env.REACT_APP_SERVER_URL +
          "/api/customer/" +
          selectedCustomer.id +
          "/construct?access-token=" +
          localStorage.getItem("token")
      )
        .then((res) => res.json())
        .then((customerStructure) => {
          setCustomerStructure(customerStructure["customerConstruct"]);
        });
    }
  }, [selectedCustomer, updateTrigger]);

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

        equipmentTypeList,
        setEquipmentTypeList,

        updateTrigger,
        setUpdateTrigger,
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
