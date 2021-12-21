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
import LoginPage from "./components/pages/Login";
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
  const [customerNetwork, setCustomerNetwork] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [equipmentTypeList, setEquipmentTypeList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    try {
      Profile.getProfile().then((data) => {
        if (data) {
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
        } else console.log("Profile not found.");
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (selectedCustomer.id) {
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/customer/" +
            selectedCustomer.id +
            "/construct?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((customerStructure) => {
            if (customerStructure)
              setCustomerStructure(customerStructure["customerConstruct"]);
            else console.log("Customer structure not found.");
          });
      } catch (e) {
        console.log(e);
      }
      try {
        fetch(
          process.env.REACT_APP_SERVER_URL +
            "/api/customer/" +
            selectedCustomer.id +
            "/network?access-token=" +
            localStorage.getItem("token")
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            setCustomerNetwork(data["Network"])
          });
      } catch (e) {
        console.log(e);
      }
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
        customerNetwork,
        setCustomerNetwork,

        equipmentTypeList,
        setEquipmentTypeList,

        updateTrigger,
        setUpdateTrigger,
      }}
    >
      <Router>
        <Switch>
          <Route path="/dashboard/:path?">
            {userProfile && Object.keys(userProfile).length > 0 ? (
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
                  {userProfile && Object.keys(userProfile).length > 0 ? (
                    <Redirect to="/dashboard" />
                  ) : (
                    <Redirect to="/login" />
                  )}
                </Route>
                <Route path="/login">
                  {userProfile && Object.keys(userProfile).length > 0 ? (
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
