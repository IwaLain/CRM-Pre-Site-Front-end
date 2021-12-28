import { useEffect, useReducer, useState } from "react";
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
import { reducer } from "./reducer";

const App = () => {
  const initialState = {
    customerStructure: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { customerStructure } = state;

  const [userProfile, setUserProfile] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [equipmentTypeList, setEquipmentTypeList] = useState([]);

  const [entityID, setEntityID] = useState();
  const [editId, setEditId] = useState();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
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
      }
    });
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
              dispatch({
                customerStructure: customerStructure["customerConstruct"],
              });
          });
      } catch (e) {}
    }
  }, [selectedCustomer, updateTrigger]);

  return (
    <GlobalContext.Provider
      value={{
        editId,
        setEditId,

        entityID,
        setEntityID,

        userProfile,
        setUserProfile,

        selectedCustomer,
        setSelectedCustomer,

        customerStructure,

        equipmentTypeList,
        setEquipmentTypeList,

        updateTrigger,
        setUpdateTrigger,
      }}
    >
      <Router>
        <Switch>
          <Route path="/:path?">
            {userProfile && Object.keys(userProfile).length > 0 ? (
              <DashboardLayout>
                <Switch>
                  {routes.map(({ path, children }, index) => {
                    return (
                      <Route key={index} path={path} children={children} />
                    );
                  })}
                  <Route exact path="/login">
                    <Redirect to="/customers" />
                  </Route>
                </Switch>
              </DashboardLayout>
            ) : (
              <AuthLayout>
                <Switch>
                  <Route exact path="/">
                    {localStorage.getItem("token") ? (
                      <Redirect to="/customers" />
                    ) : (
                      <Redirect to="/login" />
                    )}
                  </Route>
                  <Route path="/login">
                    {localStorage.getItem("token") ? (
                      <Redirect to="/customers" />
                    ) : (
                      <LoginPage />
                    )}
                  </Route>
                  <Route component={NotFound} />
                </Switch>
              </AuthLayout>
            )}
          </Route>
        </Switch>
      </Router>
    </GlobalContext.Provider>
  );
};

export default App;
