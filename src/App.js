import { useEffect, useReducer, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { GlobalContext } from "./context";
import DashboardLayout from "./components/layouts/DashboardLayout/DashboardLayout";
import NotFound from "./pages/NotFound/NotFound";
import routes from "./routes";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout";
import LoginPage from "./pages/Login/Login";
import Profile from "./js/api/profile";
import { reducer } from "./reducer";
import Loader from "./js/helpers/loader";

const App = () => {
  const initialState = {
    customerStructure: {},
    isLoading: true,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { customerStructure, isLoading } = state;

  const [userProfile, setUserProfile] = useState({});
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [equipmentTypeList, setEquipmentTypeList] = useState([]);

  const [entityID, setEntityID] = useState();
  const [editId, setEditId] = useState();
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    console.log("profile");
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
              dispatch({ isLoading: false });
            });
        }
      } else {
        dispatch({ isLoading: false });
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCustomer.id) {
      console.log("structure");
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
      {!isLoading ? (
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
                    <Route component={NotFound} />
                  </Switch>
                </DashboardLayout>
              ) : (
                <AuthLayout>
                  <Switch>
                    <Route path="/login">
                      <LoginPage />
                    </Route>
                    <Route>
                      <Redirect to="/login" />
                    </Route>
                  </Switch>
                </AuthLayout>
              )}
            </Route>
          </Switch>
        </Router>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      )}
    </GlobalContext.Provider>
  );
};

export default App;
